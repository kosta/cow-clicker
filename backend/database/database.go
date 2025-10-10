package database

import (
	"database/sql"
	"errors"
	"fmt"
	"time"

	_ "modernc.org/sqlite"
)

type Database struct{ db *sql.DB }

type ClickRow struct {
	Count     uint64
	NextClick time.Time
}

const DEFAULT_NAME = "cowclicker.sqlite"
const QUERY = "?" +
	"_pragma=foreign_keys(1)&" + // enforce referential integrity
	"_pragma=journal_mode(WAL)&" + // better concurrency + durability
	"_pragma=synchronous(NORMAL)&" + // good balance (use FULL for maximum durability)
	"_busy_timeout=5000" // ms to wait on busy DB before failing

const NEXT_CLICK_DELAY = 1 * time.Second

func Open() (Database, error) {
	return OpenNamed(DEFAULT_NAME)
}

func OpenNamed(filename string) (Database, error) {
	db, err := sql.Open("sqlite", fmt.Sprintf("file:%s%s", filename, QUERY))
	if err != nil {
		return Database{}, err
	}
	_, err = db.Exec(POOR_MANS_MIGRATION)
	if err != nil {
		return Database{}, err
	}
	return Database{db}, nil
}

func (d *Database) ClickIfAllowedBy(now time.Time) (bool, ClickRow, error) {
	nextClick := now.Add(NEXT_CLICK_DELAY)
	row := d.db.QueryRow("UPDATE clicks SET (count, next_click) = (count + 1, ?) WHERE next_click <= ? OR next_click IS NULL RETURNING count", nextClick.Format(time.RFC3339), now.Format(time.RFC3339))
	clickRow := ClickRow{Count: 0, NextClick: nextClick}
	if err := row.Scan(&clickRow.Count); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			// click was too soon
			return false, ClickRow{}, nil
		}
		// database error
		return false, ClickRow{}, err
	}
	return true, clickRow, nil
}

func (d *Database) NextClick() (ClickRow, error) {
	row := d.db.QueryRow("SELECT count, next_click FROM clicks LIMIT 1")
	var clickRow ClickRow
	var nextClickString string
	if err := row.Scan(&clickRow.Count, &nextClickString); err != nil {
		return clickRow, err
	}
	var err error
	clickRow.NextClick, err = time.Parse(time.RFC3339, nextClickString)
	if err != nil {
		return clickRow, err
	}
	return clickRow, nil
}

const POOR_MANS_MIGRATION = `
-- create table clicks
CREATE TABLE IF NOT EXISTS clicks (count INTEGER NOT NULL, next_click TEXT) STRICT;
-- ensure there's one row (until we have multiple cows)
INSERT INTO clicks SELECT 0 AS count, NULL AS next_click WHERE NOT EXISTS (SELECT 1 FROM clicks);
`
