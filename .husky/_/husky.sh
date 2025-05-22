#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) - $1"
  }

  readonly hook_name="$(basename "$0")"
  debug "current working directory is $(pwd)"
  debug "husky.sh toplevel $(git rev-parse --show-toplevel)"
  cd "$(git rev-parse --show-toplevel)" || exit 1
  export PATH="$PATH:$(npm bin)"
fi
