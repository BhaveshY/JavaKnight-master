#!/bin/bash

# Create the pieces directory if it doesn't exist
mkdir -p public/assets/pieces

# Base URL for the chess pieces (using Wikimedia Commons pieces)
BASE_URL="https://upload.wikimedia.org/wikipedia/commons/thumb"

# Download white pieces
curl -o public/assets/pieces/wp.png "$BASE_URL/4/45/Chess_plt45.svg/60px-Chess_plt45.svg.png"
curl -o public/assets/pieces/wn.png "$BASE_URL/7/70/Chess_nlt45.svg/60px-Chess_nlt45.svg.png"
curl -o public/assets/pieces/wb.png "$BASE_URL/b/b1/Chess_blt45.svg/60px-Chess_blt45.svg.png"
curl -o public/assets/pieces/wr.png "$BASE_URL/7/72/Chess_rlt45.svg/60px-Chess_rlt45.svg.png"
curl -o public/assets/pieces/wq.png "$BASE_URL/1/15/Chess_qlt45.svg/60px-Chess_qlt45.svg.png"
curl -o public/assets/pieces/wk.png "$BASE_URL/4/42/Chess_klt45.svg/60px-Chess_klt45.svg.png"

# Download black pieces
curl -o public/assets/pieces/bp.png "$BASE_URL/c/c7/Chess_pdt45.svg/60px-Chess_pdt45.svg.png"
curl -o public/assets/pieces/bn.png "$BASE_URL/e/e1/Chess_ndt45.svg/60px-Chess_ndt45.svg.png"
curl -o public/assets/pieces/bb.png "$BASE_URL/9/98/Chess_bdt45.svg/60px-Chess_bdt45.svg.png"
curl -o public/assets/pieces/br.png "$BASE_URL/f/ff/Chess_rdt45.svg/60px-Chess_rdt45.svg.png"
curl -o public/assets/pieces/bq.png "$BASE_URL/4/47/Chess_qdt45.svg/60px-Chess_qdt45.svg.png"
curl -o public/assets/pieces/bk.png "$BASE_URL/f/f0/Chess_kdt45.svg/60px-Chess_kdt45.svg.png"
