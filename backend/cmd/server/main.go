package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	db "cowclicker-backend/database"
	cowclickerv1 "cowclicker-grpc-api/gen/go/cowclicker/v1"
	cowclickerv1connect "cowclicker-grpc-api/gen/go/cowclicker/v1/v1connect"
)

type CowclickerServer struct {
	database db.Database
}

const SLEEP_DURATION_THRESHOLD = 200 * time.Millisecond

// TODO: Move most of this into a proper package

// TODO: TESTS!!!!1

// TODO: Make generic
func withServerTimings(fn func(now time.Time) (*cowclickerv1.ClickResponse, error)) (*cowclickerv1.ClickResponse, error) {
	now := time.Now()
	res, err := fn(now)
	if res == nil {
		return nil, err
	}
	res.ServerReceivedEpochMs = uint64(now.UnixMilli())
	res.ServerSentEpochMs = uint64(time.Now().UnixMilli())
	// TODO: dont return internal errors here
	return res, err
}

func toClickResponse(clickRow db.ClickRow) *cowclickerv1.ClickResponse {
	return &cowclickerv1.ClickResponse{
		ClickCount: clickRow.Count,
		// NextClick:  nextClick,
	}
}

func (s *CowclickerServer) Click(
	ctx context.Context,
	req *cowclickerv1.ClickRequest,
) (*cowclickerv1.ClickResponse, error) {
	return withServerTimings(func(now time.Time) (*cowclickerv1.ClickResponse, error) {
		ok, clickRow, err := s.database.ClickIfAllowedBy(now)
		if err != nil {
			return nil, err
		}
		if ok {
			// click was accepted
			return toClickResponse(clickRow), nil
		}

		// next allowed click is in the future
		clickRow, err = s.database.NextClick()
		if err != nil {
			return nil, err
		}
		sleepDuration := clickRow.NextClick.Sub(now)
		if sleepDuration > SLEEP_DURATION_THRESHOLD {
			// next click is too far in the future, don't wait
			return toClickResponse(clickRow), nil
		}

		time.Sleep(sleepDuration)
		ok, clickRow, err = s.database.ClickIfAllowedBy(time.Now())
		if err != nil {
			return nil, err
		}
		if ok {
			return toClickResponse(clickRow), nil
		}

		// someone else clicked, let's return the current row and let the user retry
		clickRow, err = s.database.NextClick()
		if err != nil {
			return nil, err
		}
		return toClickResponse(clickRow), nil
	})
}

const connectPrefix = "/connect"
const addr = ":5174"

func main() {
	database, err := db.Open()
	if err != nil {
		log.Fatalf("Error opening database: %s", err)
	}
	cowClickServer := &CowclickerServer{database: database}
	cowClickMux := http.NewServeMux()
	cowClickMux.Handle(cowclickerv1connect.NewClickServiceHandler(cowClickServer))

	// expose under /connect
	mux := http.NewServeMux()
	mux.Handle(connectPrefix+"/", http.StripPrefix(connectPrefix, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cowClickMux.ServeHTTP(w, r)
	})))

	p := new(http.Protocols)
	p.SetHTTP1(true)
	// Use h2c so we can serve HTTP/2 without TLS.
	p.SetUnencryptedHTTP2(true)
	s := http.Server{
		Addr:      addr,
		Handler:   mux,
		Protocols: p,
	}
	fmt.Println("Server is running on", addr, "under", connectPrefix)
	s.ListenAndServe()
}
