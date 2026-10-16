#!/usr/bin/env bash
# Remap dead/flaky gopkg.in hosts used by legacy Sock Shop manifests to GitHub.
set -euo pipefail

git config --global url."https://github.com/DATA-DOG/go-sqlmock".insteadOf "https://gopkg.in/DATA-DOG/go-sqlmock.v1"
git config --global url."https://github.com/airbrake/gobrake".insteadOf "https://gopkg.in/airbrake/gobrake.v2"
git config --global url."https://github.com/gemnasium/logrus-airbrake-hook".insteadOf "https://gopkg.in/gemnasium/logrus-airbrake-hook.v2"
git config --global url."https://github.com/go-mgo/mgo.git".insteadOf "https://gopkg.in/mgo.v2"
git config --global url."https://github.com/go-mgo/mgo.git".insteadOf "https://gopkg.in/mgo.v2/"
git config --global url."https://github.com/go-tomb/tomb.git".insteadOf "https://gopkg.in/tomb.v2"
git config --global url."https://github.com/go-tomb/tomb.git".insteadOf "https://gopkg.in/tomb.v2/"

# Glide sometimes fails VCS detection on gopkg.in even with insteadOf — seed GOPATH copies.
seed_gopkg() {
  local import_path="$1"
  local github_url="$2"
  local dest="${GOPATH:-/go}/src/${import_path}"
  if [ -d "${dest}/.git" ] || [ -d "${dest}" ]; then
    return 0
  fi
  mkdir -p "$(dirname "$dest")"
  git clone --depth 1 "$github_url" "$dest"
}

seed_gopkg "gopkg.in/mgo.v2" "https://github.com/go-mgo/mgo.git" || true
seed_gopkg "gopkg.in/tomb.v2" "https://github.com/go-tomb/tomb.git" || true
