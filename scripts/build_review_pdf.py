"""Assemble full-page screenshots into a client-review PDF.

Run from the project root: python scripts/build_review_pdf.py
"""
import glob
import os
from datetime import date

from PIL import Image
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

# Brand palette (see tailwind.config.ts)
INK = HexColor("#1B2740")
PRIMARY = HexColor("#F5A524")
CREAM = HexColor("#FFF8EC")
GREY = HexColor("#7C8CB6")

PAGE_TITLES = {
    "01-home": "Home",
    "02-about": "About Us",
    "03-services": "Services (Overview)",
    "04-service-habit-routine-building": "Service Detail — Habit & Routine Building",
    "05-service-board-exam-prep": "Service Detail — Study Skills & Board Prep",
    "06-service-career-counseling": "Service Detail — Career Counseling",
    "07-service-teacher-recommendations": "Service Detail — Teacher Recommendations",
    "08-how-it-works": "How It Works",
    "09-pricing": "Pricing",
    "10-testimonials": "Testimonials",
    "11-book": "Book a Free Session",
    "12-blog": "Blog",
    "13-blog-post": "Blog — Sample Post",
    "14-privacy": "Privacy Policy",
    "15-terms": "Terms of Service",
}

ROUTES = {
    "01-home": "/",
    "02-about": "/about",
    "03-services": "/services",
    "04-service-habit-routine-building": "/services/habit-routine-building",
    "05-service-board-exam-prep": "/services/board-exam-prep",
    "06-service-career-counseling": "/services/career-counseling",
    "07-service-teacher-recommendations": "/services/teacher-recommendations",
    "08-how-it-works": "/how-it-works",
    "09-pricing": "/pricing",
    "10-testimonials": "/testimonials",
    "11-book": "/book",
    "12-blog": "/blog",
    "13-blog-post": "/blog/building-a-study-routine-that-sticks",
    "14-privacy": "/privacy",
    "15-terms": "/terms",
}

OUTPUT = "LittleLamp-Website-Review.pdf"
MARGIN = 36
HEADER_H = 54
FOOTER_H = 24
LOGO_PATH = "public/logo/logo-full.svg"  # not embedded directly (SVG); PNG header used instead


def draw_header(c, page_w, page_h, title, route, page_num, total):
    c.setFillColor(INK)
    c.rect(0, page_h - HEADER_H, page_w, HEADER_H, fill=1, stroke=0)

    # Little flame mark
    c.setFillColor(PRIMARY)
    c.circle(MARGIN + 10, page_h - HEADER_H / 2, 8, fill=1, stroke=0)

    c.setFillColor(HexColor("#FFFFFF"))
    c.setFont("Helvetica-Bold", 14)
    c.drawString(MARGIN + 28, page_h - HEADER_H / 2 - 5, f"LittleLamp — {title}")

    c.setFont("Helvetica", 9)
    c.setFillColor(HexColor("#D3D9E8"))
    c.drawRightString(page_w - MARGIN, page_h - HEADER_H / 2 - 4, route)


def draw_footer(c, page_w, page_num, total):
    c.setFillColor(GREY)
    c.setFont("Helvetica", 8)
    c.drawString(MARGIN, 14, "LittleLamp — Website Review Draft")
    c.drawRightString(page_w - MARGIN, 14, f"Page {page_num} of {total}")


def cover_page(c, page_w, page_h, total_screens):
    c.setFillColor(CREAM)
    c.rect(0, 0, page_w, page_h, fill=1, stroke=0)

    # Flame mark
    cx, cy = page_w / 2, page_h / 2 + 140
    c.setFillColor(PRIMARY)
    c.circle(cx, cy, 34, fill=1, stroke=0)
    c.setFillColor(INK)
    c.circle(cx, cy - 46, 44, fill=1, stroke=0)

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 30)
    c.drawCentredString(page_w / 2, page_h / 2 + 40, "LittleLamp")

    c.setFillColor(PRIMARY)
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(page_w / 2, page_h / 2 + 12, "Website Review — Full Page Walkthrough")

    c.setFillColor(GREY)
    c.setFont("Helvetica", 11)
    c.drawCentredString(page_w / 2, page_h / 2 - 16, f"{total_screens} pages captured from the working build")
    c.drawCentredString(page_w / 2, page_h / 2 - 34, date.today().strftime("%B %d, %Y"))

    c.setFillColor(GREY)
    c.setFont("Helvetica-Oblique", 9)
    c.drawCentredString(
        page_w / 2, 60,
        "Draft for client review — booking widget, pricing, and contact details are placeholders."
    )
    c.showPage()


def main():
    files = sorted(glob.glob("*.png"), key=lambda f: os.path.basename(f))
    files = [f for f in files if os.path.splitext(os.path.basename(f))[0] in PAGE_TITLES]
    total = len(files)

    c = canvas.Canvas(OUTPUT, pagesize=letter)
    page_w, page_h = letter

    cover_page(c, page_w, page_h, total)

    for i, f in enumerate(files, start=1):
        key = os.path.splitext(os.path.basename(f))[0]
        title = PAGE_TITLES[key]
        route = ROUTES[key]

        img = Image.open(f)
        img_w, img_h = img.size

        avail_w = page_w - 2 * MARGIN
        avail_h_first_chunk = page_h - HEADER_H - FOOTER_H - 10

        scale = avail_w / img_w
        scaled_h = img_h * scale

        max_h_px = avail_h_first_chunk / scale  # how many source px fit in one page height

        if scaled_h <= avail_h_first_chunk:
            # Fits on a single page
            c.drawImage(
                f, MARGIN, page_h - HEADER_H - scaled_h - 5,
                width=avail_w, height=scaled_h, preserveAspectRatio=True, mask="auto"
            )
            draw_header(c, page_w, page_h, title, route, i, total)
            draw_footer(c, page_w, i, total)
            c.showPage()
        else:
            # Split tall screenshots across multiple pages. Distribute height
            # evenly across chunks (rather than fixed-size chunks with a
            # small leftover sliver) so no page ends up mostly blank.
            n_chunks = int((img_h // max_h_px) + (1 if img_h % max_h_px else 0))
            even_chunk_h = img_h / n_chunks
            for chunk in range(n_chunks):
                top_px = int(chunk * even_chunk_h)
                bottom_px = int(min((chunk + 1) * even_chunk_h, img_h))
                crop = img.crop((0, top_px, img_w, bottom_px))
                tmp_path = f"_chunk_{key}_{chunk}.png"
                crop.save(tmp_path)

                chunk_h_pt = (bottom_px - top_px) * scale
                c.drawImage(
                    tmp_path, MARGIN, page_h - HEADER_H - chunk_h_pt - 5,
                    width=avail_w, height=chunk_h_pt, preserveAspectRatio=True, mask="auto"
                )
                part_title = title if n_chunks == 1 else f"{title} (part {chunk + 1}/{n_chunks})"
                draw_header(c, page_w, page_h, part_title, route, i, total)
                draw_footer(c, page_w, i, total)
                c.showPage()
                os.remove(tmp_path)

    c.save()
    print(f"Wrote {OUTPUT} ({total} screenshots)")


if __name__ == "__main__":
    main()
