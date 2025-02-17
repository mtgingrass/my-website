library(yaml)  # For parsing YAML
library(fs)    # For file system operations

# Define the directory where your Quarto blog posts are stored
blog_directory <- "posts"  # Update with your actual path

# Function to extract tags and categories from YAML front matter
extract_metadata <- function(file_path) {
  content <- readLines(file_path)  # Read the file content
  yaml_header <- yaml::read_yaml(text = paste(content[1:grep("^---$", content)[2]], collapse = "\n"))  # Extract YAML
  
  # Extract tags and categories
  tags <- yaml_header$tags
  categories <- yaml_header$categories
  
  return(list(tags = tags, categories = categories))
}

# Get all .qmd files recursively in the blog directory
files <- dir_ls(blog_directory, glob = "*.qmd", recurse = TRUE)

# Extract metadata from all files
metadata <- lapply(files, extract_metadata)

# Extract unique tags and categories
tags <- unique(unlist(lapply(metadata, `[[`, "tags")))
categories <- unique(unlist(lapply(metadata, `[[`, "categories")))

# Display results
cat("Unique Tags:\n")
print(tags)

cat("\nUnique Categories:\n")
print(categories)
