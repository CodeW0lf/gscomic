#!/usr/bin/env bash
# Set or unset wrangler's Cloudflare credentials in the current shell.
#
# Usage (must be sourced, not executed):
#   source scripts/cf-env.sh          # export CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN
#   source scripts/cf-env.sh unset    # remove them from the environment

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  echo "cf-env.sh must be sourced, e.g.: source ${BASH_SOURCE[0]}" >&2
  exit 1
fi

_cf_env_dir="$HOME/.config/cf/gscomic"

if [[ "$1" == "unset" ]]; then
  unset CLOUDFLARE_ACCOUNT_ID
  unset CLOUDFLARE_API_TOKEN
else
  CLOUDFLARE_ACCOUNT_ID="$(<"$_cf_env_dir/account")"
  CLOUDFLARE_API_TOKEN="$(<"$_cf_env_dir/token")"
  export CLOUDFLARE_ACCOUNT_ID CLOUDFLARE_API_TOKEN
fi

unset _cf_env_dir
