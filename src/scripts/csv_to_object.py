# This scirpt output json of klis subjects data from csv
# Still, data shaping should be needed.

import csv
import os
import json
import re
from  decimal import Decimal, ROUND_HALF_UP

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_DIR = os.path.join(BASE_DIR, '../../public/data')
Distr = 'Distribution'
OUTPUT_DIR = os.path.join(BASE_DIR, '../js/data')
SEARCH_DATA_DIR = 'search'

TARGET_DATA_TYPE = [
  'Distribution',
  'Evaluation'
]

def OrderedDictToDict(array):
  new_array = []
  for dict_ in array:
    new_dict = {}
    for key,value in dict_.items():
      new_dict[key] = value
    new_array.append(new_dict)
  return new_array

def GetEvaluMean(subjects):
  sums = {
    '問1': 0,
    '問2': 0,
    '問3': 0,
    '問4': 0,
    '問8': 0,
    '問9': 0,
    '問10': 0,
    '問11': 0,
    '問12': 0,
    '問13': 0,
    '問14': 0,
    '問15': 0,
    '問16': 0,
    '問17': 0,
  }
  for subject in subjects:
    sums['問1'] += float(subject['問1'])
    sums['問2'] += float(subject['問2'])
    sums['問3'] += float(subject['問3'])
    sums['問4'] += float(subject['問4'])
    sums['問8'] += float(subject['問8'])
    sums['問9'] += float(subject['問9'])
    sums['問10'] += float(subject['問10'])
    sums['問11'] += float(subject['問11'])
    sums['問12'] += float(subject['問12'])
    sums['問13'] += float(subject['問13'])
    sums['問14'] += float(subject['問14'])
    sums['問15'] += float(subject['問15'])
    sums['問16'] += float(subject['問16'])
    sums['問17'] += float(subject['問17'])
  for key, value in sums.items():
    sums[key] = float(Decimal(value / len(subjects)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP))

  return sums

def Template(variable_name, resource):
  template = '''
import {{ fromJS }} from 'immutable';
const original_{0} = {1};

const {0} = fromJS(original_{0});
export default {0};
'''
  return template.format(variable_name, resource)

def SearchTemplate(variable_name, resource):
  template = '''
const {0} = {1};

export default {0};
'''
  return template.format(variable_name, resource)

def EvaluNumberToInt(subject):
  subject['履修者数'] = int(float(subject['履修者数'])) if '履修者数' in subject else int(float(subject['履修者']))
  subject['回答者数'] = int(float(subject['回答者数'])) if '回答者数' in subject else int(float(subject['回答者']))
  subject['問1'] = float(subject['問1'])
  subject['問2'] = float(subject['問2'])
  subject['問3'] = float(subject['問3'])
  subject['問4'] = float(subject['問4'])
  subject['問5'] = float(subject['問5']) if subject['問5'] else 'undefined'
  subject['問6'] = float(subject['問6']) if subject['問6'] else 'undefined'
  subject['問7'] = float(subject['問7']) if subject['問7'] else 'undefined'
  subject['問8'] = float(subject['問8'])
  subject['問9'] = float(subject['問9'])
  subject['問10'] = float(subject['問10'])
  subject['問11'] = float(subject['問11'])
  subject['問12'] = float(subject['問12'])
  subject['問13'] = float(subject['問13'])
  subject['問14'] = float(subject['問14'])
  subject['問15'] = float(subject['問15'])
  subject['問16'] = float(subject['問16'])
  subject['問17'] = float(subject['問17'])
  # 表記ブレの吸収
  _ = subject.pop('履修者') if '履修者' in subject else ""
  _ = subject.pop('回答者') if '回答者' in subject else ""
  return subject

def DistrNumberTOInt(subject):
  subject['履修者数'] = int(subject['履修者数'])
  subject['A+dig'] = float(subject['A+dig'])
  subject['A+per'] = float(subject['A+per'])
  subject['A_dig'] = float(subject['A_dig'])
  subject['A_per'] = float(subject['A_per'])
  subject['B_dig'] = float(subject['B_dig'])
  subject['B_per'] = float(subject['B_per'])
  subject['C_dig'] = float(subject['C_dig'])
  subject['C_per'] = float(subject['C_per'])
  subject['D_dig'] = float(subject['D_dig'])
  subject['D_per'] = float(subject['D_per'])
  subject['A+_A_dig'] = float(subject['A+_A_dig'])
  subject["A+_A_per"] = float(subject['A+_A_per'])

  return subject


#
files = os.listdir(CSV_DIR)
filenames = [f for f in files if os.path.isfile(os.path.join(CSV_DIR, f))]

json_dic = {}
for resource in TARGET_DATA_TYPE:
  resource_dic = {}
  search_data = {}
  evalu_means = {}
  target_filenames = [f for f in filenames if re.search(resource, f)]
  for filename in target_filenames:
    m = re.search(r'%s(\d+).csv' % resource, filename)
    year = int(m.group(1))
    subjects = None
    print(year)
    with open(os.path.join(CSV_DIR, filename), 'r') as file:
      reader = csv.DictReader(file)
      subjects = OrderedDictToDict(reader)

    if resource == 'Evaluation':
      evalu_means[year] = GetEvaluMean(subjects)

    for subject in subjects:
      resource_dic.setdefault(year, {})
      resource_dic[year].setdefault(subject['科目名称'], [])

      # 通年科目は春秋で分けられているので、秋学期のデータのみを扱う
      same_subject_count = len([ x for x in subjects if x['科目番号'] == subject['科目番号']])
      if same_subject_count >= 2 and subject['学期'] == '春':
        continue

      # 数値データをintに返す。
      if resource == 'Distribution':
        subject = DistrNumberTOInt(subject)
      elif resource == 'Evaluation':
        subject = EvaluNumberToInt(subject)

      resource_dic[year][subject['科目名称']].append(subject)


      search_data.setdefault(year, [])
      new_dic = {
        'id': subject['科目番号'],
        'label': subject['科目名称']
      }
      search_data[year].append(new_dic)

  json_str = json.dumps(resource_dic, ensure_ascii=False, indent=4, separators=(',', ': '))
  with open(os.path.join(OUTPUT_DIR, resource + '.ts'), 'w') as file:
    json_str = Template(resource, json_str)
    file.write(json_str)


  json_str = json.dumps(search_data, ensure_ascii=False, indent=4, separators=(',', ': '))
  with open(os.path.join(OUTPUT_DIR, SEARCH_DATA_DIR, resource + '.ts'), 'w') as file:
    json_str = SearchTemplate('Search' + resource, json_str)
    file.write(json_str)

  if evalu_means:
    json_str = json.dumps(evalu_means, ensure_ascii=False, indent=4, separators=(',', ': '))
    with open(os.path.join(OUTPUT_DIR, resource + 'MeanData.ts'), 'w') as file:
      json_str = SearchTemplate('MeanData' + resource, json_str)
      file.write(json_str)
