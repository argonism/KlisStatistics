import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import UIModal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styled from 'styled-components';
import { Map } from 'immutable';
import media from 'styled-media-query';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

type ModalProps = {
  open: boolean;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  subjects: Array<Map<string, string>>;
  onClick: Function;
};

const Modal = (props: ModalProps) => {
  const classes = useStyles();

  let keyCounter = 0;
  const targetLi = props.subjects.map(IMsubject => {
    const subject = IMsubject.toObject();
    const displayText = `${subject['科目名称']}  ${subject['科目番号']}`;
    keyCounter += 1;
    return (
      <SelectLI
        key={keyCounter}
        value={subject['科目番号']}
        onClick={e => {
          const target = e.target as Element;
          props.onClick(target.getAttribute('value'));
        }}
      >
        {displayText}
      </SelectLI>
    );
  });

  return (
    <UIModal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={props.open}
      onClose={props.onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <ModalWrapper>
          <ModalInfo>
            <ModalTitle id='transition-modal-title'>同じ名前の科目が複数あります</ModalTitle>
            <ModalDiscription>科目を一つ選択してください</ModalDiscription>
          </ModalInfo>
          <SelectUL>{targetLi}</SelectUL>
        </ModalWrapper>
      </Fade>
    </UIModal>
  );
};

const ModalWrapper = styled.div`
  padding: 20px 0px;
  width: 50%;
  height: 40%;
  color: #fff;
  background-color: #aaa;
  text-align: center;
  position: relative;
  ${media.lessThan('small')`
    width: 80%;
    padding: 0;
  `};
`;

const ModalInfo = styled.div`
  width: 80%;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 18%;
  left: 50%;
`;

const ModalTitle = styled.p`
  margin: 0 0 20px 0;
  font-size: 20px;

  ${media.lessThan('small')`
    margin: 0 0 10px 0;
    font-size: 16px;
  `};
`;
const ModalDiscription = styled.p`
  margin: 0 0 10px 0;
`;

const SelectUL = styled.ul`
  width: 100%;
  /* height: 100%; */
  padding: 0;
  max-height: 70%;
  overflow-y: scroll;
  position: absolute;
  top: 30%;
`;

const SelectLI = styled.li`
  height: 50px;
  font-size: 16px;
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
  background-color: #fff;
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.15s linear 0s;

  &:not(:first-child){
    border-top: none;
  }

  &:hover{
    background-color: #eee;
  }
}
`;

export default Modal;
