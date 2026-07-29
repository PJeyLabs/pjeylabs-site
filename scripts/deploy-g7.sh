#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

G7_DIR="g7"
REQUIRED_FILES=("index.html" "admin.html" "picker.html" "rep.html")

for f in "${REQUIRED_FILES[@]}"; do
  if [[ ! -f "$G7_DIR/$f" ]]; then
    echo "Error: missing required file $G7_DIR/$f" >&2
    exit 1
  fi
done

for f in "$G7_DIR"/*.html; do
  sed -i \
    -e 's/href="index\.html"/href="\/g7\/"/g' \
    -e 's/href="admin\.html"/href="\/g7\/admin"/g' \
    -e 's/href="picker\.html"/href="\/g7\/picker"/g' \
    -e 's/href="rep\.html"/href="\/g7\/rep"/g' \
    "$f"
done

if grep -H 'href="[^"]*\.html"' "$G7_DIR"/*.html; then
  echo "Error: found unresolved .html href(s) above" >&2
  exit 1
fi

firebase deploy --only hosting

BASE_URL="https://pjeylabs-hub.web.app"
for path in "/g7/" "/g7/admin" "/g7/picker" "/g7/rep"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$path")
  echo "$path -> $code"
done
