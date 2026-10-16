#!/usr/bin/env bash
# Remap dead/flaky gopkg.in hosts used by legacy Sock Shop manifests to GitHub.
set -euo pipefail
git config --global url."https://github.com/DATA-DOG/go-sqlmock".insteadOf "https://gopkg.in/DATA-DOG/go-sqlmock.v1"
git config --global url."https://github.com/airbrake/gobrake".insteadOf "https://gopkg.in/airbrake/gobrake.v2"
git config --global url."https://github.com/gemnasium/logrus-airbrake-hook".insteadOf "https://gopkg.in/gemnasium/logrus-airbrake-hook.v2"
git config --global url."https://github.com/go-mgo/mgo".insteadOf "https://gopkg.in/mgo.v2"
git config --global url."https://github.com/go-tomb/tomb".insteadOf "https://gopkg.in/tomb.v2"
git config --global url."https://github.com/tombuildsstuff/goxmldsig".insteadOf "https://gopkg.in/tombuildsstuff/goxmldsig.v1" || true
