import requests
from bs4 import BeautifulSoup
import re
import os
from enum import Enum, auto

BASE_DIR = os.getcwd()

class FileType(Enum):
  Distr = auto()
  Evalu = auto()
  Teach = auto()

def identify_filetype(filename):
  if re.search(r'Distribution', filename):
    return (FileType.Distr, int(re.findall(r'Distribution(\d{4})', filename)[0]))
  elif re.search(r'Evaluation', filename):
    return (FileType.Evalu, int(re.findall(r'Evaluation(\d{4})', filename)[0]))
  elif re.search(r'TeacharsList', filename):
    return (FileType.Teach, int(re.findall(r'TeacharsList(\d{4})', filename)[0]))


CSV_DIR = 'public/pdf/'
distr_years = []
evalu_years = []
teach_years = []
def check_currently_installed_data():
  print("checking the data we already have.")
  for filename in [ content for content in os.listdir(os.path.join(BASE_DIR, CSV_DIR)) if os.path.isfile(os.path.join(CSV_DIR, content))]:
    filetype_year = identify_filetype(filename)

    if filetype_year[0] == FileType.Distr:
      distr_years.append(filetype_year[1])
    if filetype_year[0] == FileType.Evalu:
      evalu_years.append(filetype_year[1])
    if filetype_year[0] == FileType.Teach:
      teach_years.append(filetype_year[1])
    # distr_years = sorted(distr_years, reverse=True)
    # evalu_years = sorted(evalu_years, reverse=True)
    # teach_years = sorted(teach_years, reverse=True)


BASE_URL = 'http://klis.tsukuba.ac.jp/'
SOURCE_URL = 'http://klis.tsukuba.ac.jp/school_affairs.html'
TARGET_FILE_PATTERN = ['Distribution\d+\.pdf', 'Evaluation\d+\.pdf']
DOWNLOAD_DIR = 'public/pdf/'
# Get pdfs form klis hp
def main():
  check_currently_installed_data()
  print("get file links from klis hp")
  r = requests.get(SOURCE_URL)
  soup = BeautifulSoup(r.content, "html.parser")
  content_links = [ a.get('href') for a in soup.select('#sub_contents ul a')]

  for p in  TARGET_FILE_PATTERN:
    pattern = re.compile(p)
    target_links = []
    for link in content_links:
      if re.search(pattern, link.split('/')[-1]):
        target_links.append(link)

    new_file_link = []
    for link in target_links:
      # filter files already have
      filetype_year = identify_filetype(link)
      if filetype_year[0] == FileType.Distr:
        if filetype_year[1] in distr_years:
          continue
      if filetype_year[0] == FileType.Evalu:
        if filetype_year[1] in evalu_years:
          continue
      if filetype_year[0] == FileType.Teach:
        if filetype_year[1] in teach_years:
          continue
      new_file_link.append(link)

      if len(new_file_link) <= 0:
        print("nothing to update")

      if BASE_URL in link:
        r = requests.get(link)
      else:
        r = requests.get(BASE_URL + link)

      print("new file:", link.split('/')[-1])
      with open(os.path.join(BASE_DIR, DOWNLOAD_DIR + link.split('/')[-1]), 'wb+') as f:
        f.write(r.content)

if __name__ == "__main__":
    main()
