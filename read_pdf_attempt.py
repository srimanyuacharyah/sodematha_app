import sys
import os

pdf_path = r"C:\Users\Lenovo\Downloads\Vaibhavotsava Hackathon - Requirements.pdf"

def try_pypdf():
    try:
        import pypdf
        print("Using pypdf")
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        
        with open("extracted_requirements.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print("Successfully wrote to extracted_requirements.txt")
        return True
    except ImportError:
        return False
    except Exception as e:
        print(f"pypdf error: {e}")
        return False

def try_pypdf2():
    try:
        import PyPDF2
        print("Using PyPDF2")
        with open(pdf_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            print(text)
        return True
    except ImportError:
        return False
    except Exception as e:
        print(f"PyPDF2 error: {e}")
        return False

if not os.path.exists(pdf_path):
    print(f"File not found: {pdf_path}")
    sys.exit(1)

if try_pypdf():
    sys.exit(0)

if try_pypdf2():
    sys.exit(0)

print("No suitable PDF library found (pypdf, PyPDF2).")
