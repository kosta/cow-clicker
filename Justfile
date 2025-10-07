timestamp := `date -u +%Y-%m-%dT%H-%M-%SZ`
rel := "/var/www/cowclicker-deployments/" + timestamp

build:
  npm run build

deploy: build
  ssh deploy-cowclicker@cow.kosta.io "mkdir -p {{rel}}"
  rsync -az dist/client/ "deploy-cowclicker@cow.kosta.io:{{rel}}/"
  ssh deploy-cowclicker@cow.kosta.io "ln -sfn {{rel}} /var/www/cowclicker-deployments/current"
