#!/bin/bash

target_height=512

find . -maxdepth 1 -type f -name "Numbers*.webp" -print0 | while IFS= read -r -d $'\0' file; do
  if identify -format "%h" "$file" | grep -Eq "^[0-9]+$"; then
    current_height=$(identify -format "%h" "$file")
    if (( current_height > target_height )); then
      width=$(identify -format "%w" "$file")
      new_width=$(( (width * target_height + current_height - 1) / current_height )) # Calculate width preserving aspect ratio (ceiling)
      echo "Resizing '$file' to ${new_width}x${target_height}"
      mogrify -resize "${new_width}x${target_height}" "$file"
    else
      echo "Skipping '$file' (height already <= ${target_height})"
    fi
  else
    echo "Warning: Could not determine height of '$file'"
  fi
done

echo "Finished processing WebP images."
