#!/bin/bash

# Define the input directory
input_dir="static/images/originalQuality"

# Define the output directory (parent folder)
output_dir="static/images"

# Ensure the input directory exists
if [ ! -d "$input_dir" ]; then
  echo "Error: Input directory '$input_dir' not found."
  exit 1
fi

# Ensure the output directory exists
if [ ! -d "$output_dir" ]; then
  echo "Error: Output directory '$output_dir' not found."
  exit 1
fi

# Find all image files (png, jpg, jpeg) in the input directory
find "$input_dir" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -print0 | while IFS= read -r -d $'\0' file; do
  # Get the filename without the extension
  filename=$(basename "$file")
  extension="${filename##*.}"
  name_without_ext="${filename%.*}"

  # Construct the output webp filename in the parent directory
  output_webp="$output_dir/${name_without_ext}.webp"

  # Convert the image to webp with recommended compression (quality 80)
  echo "Converting '$file' to '$output_webp'..."
  convert "$file" -quality 80 "$output_webp"

  if [ $? -ne 0 ]; then
    echo "Error converting '$file' to webp."
  fi
done

echo "Conversion to webp complete."
