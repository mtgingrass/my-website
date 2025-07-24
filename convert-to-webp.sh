#!/bin/bash

# Convert images to WebP format
# Usage: ./convert-to-webp.sh <input_directory> <output_directory>

INPUT_DIR="$1"
OUTPUT_DIR="$2"

if [ -z "$INPUT_DIR" ] || [ -z "$OUTPUT_DIR" ]; then
    echo "Usage: $0 <input_directory> <output_directory>"
    exit 1
fi

if [ ! -d "$INPUT_DIR" ]; then
    echo "Error: Input directory '$INPUT_DIR' does not exist"
    exit 1
fi

mkdir -p "$OUTPUT_DIR"

echo "Converting images from $INPUT_DIR to WebP format in $OUTPUT_DIR..."

# Counter for converted files
count=0

# Convert each image file to WebP
for file in "$INPUT_DIR"/*.{png,jpg,jpeg,PNG,JPG,JPEG}; do
    # Check if file exists (in case no files match the pattern)
    if [ -f "$file" ]; then
        # Get filename without extension
        filename=$(basename "$file")
        name="${filename%.*}"
        
        # Convert to WebP
        if command -v cwebp >/dev/null 2>&1; then
            cwebp -q 80 "$file" -o "$OUTPUT_DIR/${name}.webp"
            echo "Converted: $filename -> ${name}.webp"
            ((count++))
        elif command -v magick >/dev/null 2>&1; then
            magick "$file" -quality 80 "$OUTPUT_DIR/${name}.webp"
            echo "Converted: $filename -> ${name}.webp"
            ((count++))
        else
            echo "Error: Neither cwebp nor ImageMagick found. Please install one of them:"
            echo "  - For cwebp: brew install webp"
            echo "  - For ImageMagick: brew install imagemagick"
            exit 1
        fi
    fi
done

echo "Conversion complete! Converted $count images to WebP format."