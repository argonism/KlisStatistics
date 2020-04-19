import { Record as ImRecord, Map } from 'immutable';

import Distribution from '../data/Distribution';
import Evaluation from '../data/Evaluation';
import EvaluationMean from '../data/EvaluationMeanData';

export enum ResourceType {
  Distribution = 'Distribution',
  Evaluation = 'Evaluation',
  TeacharsList = 'TeacharsList',
}

export enum GraphType {
  Pie,
  Radar,
}

class KeyCounter {
  static count = 0;

  static getCount(): number {
    const returnCount = this.count;
    this.count += 1;
    return returnCount;
  }
}

export class Graph extends ImRecord<{
  type: GraphType;
  title: string;
  data: Array<Record<string, any> | null>;
  studentCount: number;
  year: string;
  key: number;
}>({
  type: GraphType.Pie,
  title: '',
  data: [{}],
  studentCount: 0,
  year: '2018',
  key: KeyCounter.getCount(),
}) {
  static count = 0;
  static getCount(): number {
    const returnCount = this.count;
    this.count += 1;
    return returnCount;
  }

  // 科目検索。その年代の同名の科目のList(Immutable.js)を返す
  static GetSubject(year: string, subjectTitle: string, resourceType: ResourceType): Array<Map<string, string>> {
    switch (resourceType) {
      case ResourceType.Distribution:
        return Distribution.get(year)
          .get(subjectTitle)
          .toArray();
      case ResourceType.Evaluation:
        return Evaluation.get(year)
          .get(subjectTitle)
          .toArray();
      // まだ使わないので、仮置きで...
      case ResourceType.TeacharsList:
        return Distribution.get(year)
          .get(subjectTitle)
          .toArray();
    }
  }

  static CreateGraph(subject, year: string, resourceType: ResourceType, studentCount: number): Graph {
    switch (resourceType) {
      case ResourceType.Distribution:
        return new Graph({
          type: GraphType.Pie,
          title: subject['科目名称'],
          data: this.ReformDistriForPie(subject),
          studentCount: studentCount,
          year: year,
          key: KeyCounter.getCount(),
        });
      case ResourceType.Evaluation:
        return new Graph({
          type: GraphType.Radar,
          title: subject['科目名称'],
          data: this.ReformEvaluForRadar(subject, year),
          studentCount: studentCount,
          year: year,
          key: KeyCounter.getCount(),
        });
      case ResourceType.TeacharsList:
        return new Graph();
    }
  }

  static ReformDistriForPie(subject): Array<Record<string, any>> {
    return [
      { id: 'A+', value: subject['A+dig'], label: 'A+' },
      { id: 'A', value: subject['A_dig'], label: 'A' },
      { id: 'B', value: subject['B_dig'], label: 'B' },
      { id: 'C', value: subject['C_dig'], label: 'C' },
      { id: 'D', value: subject['D_dig'], label: 'D' },
    ];
  }
  static ReformEvaluForRadar(subject, year): Array<Record<string, any>> {
    return [
      {
        qIndex: '問1',
        [subject['科目名称']]: subject['問1'],
        平均: EvaluationMean[year]['問1'],
        label: '授業の準備は十分にされていたと思いますか。',
      },
      {
        qIndex: '問2',
        [subject['科目名称']]: subject['問2'],
        平均: EvaluationMean[year]['問2'],
        label: '教員の説明や授業の進め方は適切でしたか。',
      },
      {
        qIndex: '問3',
        [subject['科目名称']]: subject['問3'],
        平均: EvaluationMean[year]['問3'],
        label: '授業を通じて、この科目に関連する分野への興味や関心が高まりましたか。',
      },
      {
        qIndex: '問4',
        [subject['科目名称']]: subject['問4'],
        平均: EvaluationMean[year]['問4'],
        label: '総合的に判断して、この授業を受講してよかったと思いますか。',
      },
      {
        qIndex: '問8',
        [subject['科目名称']]: subject['問8'],
        平均: EvaluationMean[year]['問8'],
        label: '私はこの科目にはもともと興味があった。',
      },
      {
        qIndex: '問9',
        [subject['科目名称']]: subject['問9'],
        平均: EvaluationMean[year]['問9'],
        label: '私はこの授業の予習・復習・課題のために授業外で相当時間の学習を行った。',
      },
      {
        qIndex: '問10',
        [subject['科目名称']]: subject['問10'],
        平均: EvaluationMean[year]['問10'],
        label: 'この授業はシラバスに沿って計画的に行われていた。',
      },
      {
        qIndex: '問11',
        [subject['科目名称']]: subject['問11'],
        平均: EvaluationMean[year]['問11'],
        label: '授業担当者の話し方は聞き取りやすかった。',
      },
      {
        qIndex: '問12',
        [subject['科目名称']]: subject['問12'],
        平均: EvaluationMean[year]['問12'],
        label: 'この授業で使われた教科書，配布資料は適切であった。',
      },
      {
        qIndex: '問13',
        [subject['科目名称']]: subject['問13'],
        平均: EvaluationMean[year]['問13'],
        label: 'この授業における黒板，ビデオ，パソコンなどの使い方は効果的であった。',
      },
      {
        qIndex: '問14',
        [subject['科目名称']]: subject['問14'],
        平均: EvaluationMean[year]['問14'],
        label: 'この授業では学期途中に学生の意見・要望が適切に収集された。',
      },
      {
        qIndex: '問15',
        [subject['科目名称']]: subject['問15'],
        平均: EvaluationMean[year]['問15'],
        label: 'この授業の内容はよく理解できた。',
      },
      {
        qIndex: '問16',
        [subject['科目名称']]: subject['問16'],
        平均: EvaluationMean[year]['問16'],
        label: 'この授業により，新しい知識や考え方が修得できた。',
      },
      {
        qIndex: '問17',
        [subject['科目名称']]: subject['問17'],
        平均: EvaluationMean[year]['17'],
        label: 'この授業により，さらに深く勉強したくなった。',
      },
    ];
  }
}

export default Graph;
