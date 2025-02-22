#!/bin/bash

for file in *.jpg *.jpeg; do
    convert "$file" -quality 80 "$file"
done

