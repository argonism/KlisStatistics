import React, { useState } from 'react';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import { useDispatch, useSelector } from 'react-redux';
import { Map } from 'immutable';

import Graph, { GraphType, ResourceType } from '../models/Graph';
import { AddGraph } from '../actions/GraphActions';
import { State } from '../reducers';
import SearchDistribution from '../data/search/Distribution';
import SearchEvaluation from '../data/search/Evaluation';

import PieChart from './Graphs/Pie';
import RaderChart from './Graphs/Radar';
import SearchForm from './SearchForm';
import ControllArea from './ControllArea';
import Modal from './Modal';

const Course: React.FC = () => {
  const [controllState, SetControllState] = useState({
    type: ResourceType.Distribution,
    year: '2018',
    open: false,
    modalSubjects: [Map({ '': '' })],
  });
  const graphs = useSelector((state: State) => state.graphs);
  const dispatch = useDispatch();
  const handleOpen = subjects => {
    SetControllState({ ...controllState, open: true, modalSubjects: subjects });
  };
  const handleClose = () => {
    SetControllState({ ...controllState, open: false });
  };
  const OnModalClick = subjectID => {
    handleClose();
    const IMsubject = controllState.modalSubjects.find(IMsub => {
      // const subject = IMsubject.toObject();
      return IMsub.toObject()['科目番号'] === subjectID;
    });

    if (typeof IMsubject === 'undefined') {
      return;
    }

    const subject = IMsubject.toObject();
    // console.log(Graph.CreateGraph(subject, controllState.year, controllState.type, Number(subject['履修者数'])));
    dispatch(AddGraph(Graph.CreateGraph(subject, controllState.year, controllState.type, Number(subject['履修者数']))));
  };

  const OnSelected = suggestion => {
    const subjects = Graph.GetSubject(controllState.year, suggestion.label, controllState.type);
    if (subjects.length >= 2) {
      handleOpen(subjects);
      return;
    }
    const subject = subjects[0].toObject();

    dispatch(AddGraph(Graph.CreateGraph(subject, controllState.year, controllState.type, Number(subject['履修者数']))));
  };

  return (
    <>
      <Reset />

      <InputArea>
        <SearchForm
          suggestions={
            controllState.type === ResourceType.Distribution
              ? SearchDistribution[controllState.year]
              : SearchEvaluation[controllState.year]
          }
          onSelected={OnSelected}
          searchKey={'label'}
        />
      </InputArea>
      <ControllArea
        onTypeChange={value => SetControllState({ ...controllState, type: value as ResourceType })}
        onYearChange={value => SetControllState({ ...controllState, year: value })}
      />
      <ChartArea>
        {graphs.size > 1 &&
          graphs.slice(1).map(
            (graph: Graph): JSX.Element => {
              switch (graph.type) {
                case GraphType.Pie:
                  return (
                    <PieChart
                      width='400px'
                      height='400px'
                      data={graph.data}
                      title={graph.title}
                      studentCount={graph.studentCount}
                      year={graph.year}
                      key={graph.key}
                      id={graph.key}
                    />
                  );
                case GraphType.Radar:
                  return (
                    <RaderChart
                      width='400px'
                      height='400px'
                      data={graph.data}
                      keys={[graph.title]}
                      key={graph.key}
                      id={graph.key}
                    />
                  );
                default:
                  return <></>;
              }
            },
          )}
      </ChartArea>
      <Modal
        open={controllState.open}
        onClose={handleClose}
        subjects={controllState.modalSubjects}
        onClick={OnModalClick}
      ></Modal>
    </>
  );
};

const InputArea = styled.div`
  /* width: 100%; */
  padding: 10px 30px;
  background-color: #ddd;
  display: flex;
  justify-content: center;
`;

const ChartArea = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;
export default Course;
