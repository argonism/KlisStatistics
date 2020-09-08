from tqdm import tqdm
import pandas as pd
import tabula
import os
import re
from get_original_pdf import FileType,identify_filetype

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PDF_DIR =  os.path.join(BASE_DIR, '../../public/pdf')
CSV_DIR =  os.path.join(BASE_DIR, '../../public/data')

def concat_dataframes(dfs, filename):
  filetype_year = identify_filetype(filename)
  for i, df in enumerate(dfs):
    if i == 0:
      continue
    df.columns = dfs[0].columns
  df = pd.concat(dfs, axis=0)
  print(filetype_year[1])
  print(df)
  if filetype_year[0] == FileType.Distr:
    df = df.rename(columns=distr_unnamed_columns)

  return df

distr_unnamed_columns = {
  'A+': 'A+dig',
  'A': 'A_dig',
  'B': 'B_dig',
  'C': 'C_dig',
  'D': 'D_dig',
  '(A+,A)': 'A+_A_dig',
  '(A+, A)': 'A+_A_dig',
  'Unnamed: 0': 'A+per',
  'Unnamed: 1': 'A_per',
  'Unnamed: 2': 'B_per',
  'Unnamed: 3': 'C_per',
  'Unnamed: 4': 'D_per',
  'Unnamed: 5': 'A+_A_per',
}

def main():
  print("creating csv from pdf")
  for filename in tqdm(os.listdir(PDF_DIR)):
    filetype_year = identify_filetype(filename)
    if filetype_year[0] == FileType.Distr:
      continue

    # filename = "Evaluation2018.pdf"
    df = concat_dataframes(tabula.read_pdf(os.path.join(PDF_DIR, filename), lattice=True, pages='all'), filename)
    df = df.drop(df.index[-1])
    df = df.dropna(thresh=6)
    df['科目名称'] = df['科目名称'].apply(lambda d: re.sub(r'[%\n\r]', '', d))
    csv = df.to_csv(None, index=None)
    csv = csv.replace("%", "")
    with open(os.path.join(CSV_DIR, "{0}.csv".format(filename.replace(".pdf", ""))), "w+") as file:
      file.write(csv)


if __name__ == "__main__":
    main()