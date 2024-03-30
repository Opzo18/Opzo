import os

def generate_html_code(image_folder):
    output_code = ""
    for filename in os.listdir(image_folder):
        if filename.endswith(".jpg") or filename.endswith(".png") or filename.endswith(".webp"): 
            image_path = os.path.join(image_folder, filename)
            image_path = image_path.replace("\\", "/")  # Replace \ for /
            filename_without_extension = os.path.splitext(filename)[0]  # Remove file extension
            output_code += f"<a data-title=\"Caption here\" href=\"{image_path}\"><img src=\"{image_path}\" alt=\"\"></a>\n" #Change caption
    return output_code

image_folder = "./images"
html_code = generate_html_code(image_folder)

with open("output.html", "w") as html_file:
    html_file.write(html_code)
