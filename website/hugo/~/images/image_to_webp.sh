#!/bin/bash

for file in *.jpg *.jpeg *.png; do
    [ -e "$file" ] || continue  # Skip if no matching files are found
    output="${file%.*}.webp"
    convert "$file" -quality 80 "$output"
done

