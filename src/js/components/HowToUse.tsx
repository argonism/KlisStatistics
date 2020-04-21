import React, { useState } from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';

import { Path } from '../routes';

const HowToUse: React.FC = () => {
  return (
    <HowToWrapper>
      <WidthWrapper>
        <Header>
          <HowtoTitle>Klis Statistics</HowtoTitle>
          <p>klisの統計情報をグラフでみるサイト</p>
        </Header>
        <Section></Section>
        <Section>
          <SectionTitle>どうやって使うの？</SectionTitle>
          <Img src='img/klisstatistcs.gif'></Img>
          <SectionDiscription>こんな感じ</SectionDiscription>
        </Section>
        <Section>
          <SectionTitle>注意が必要な使い方</SectionTitle>
          <SectionDiscription>授業評価の質問内容が見たい時</SectionDiscription>
          <SectionDiscription>
            「問(番号)」にカーソルを合わせると<br></br>表示されます。
          </SectionDiscription>
          <SectionDiscription>↓</SectionDiscription>
          <Img src='img/section2.gif'></Img>
        </Section>
      </WidthWrapper>
    </HowToWrapper>
  );
};

const HowToWrapper = styled.div`
  /* border-top: 1px solid #333; */
  padding: 30px;
  margin-top: 30px;
  ${media.lessThan('small')`
    padding: 0;
  `};
`;

const Header = styled.div`
  width: 80%;
  margin: auto;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border-bottom: 1px solid #ddd;
  /* border: 1px solid #eee; */
  /* border-radius: 20px; */

  & p {
    margin: 30px 0 10px 0;
  }
`;

const WidthWrapper = styled.div`
  width: 600px;
  margin: auto;

  ${media.lessThan('small')`
    width: 90%;
  `};
`;

const HowtoTitle = styled.div`
  font-size: 40px;
  text-align: center;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  word-break: nomal;

  margin-bottom: 100px;
  ${media.lessThan('small')`
    margin-bottom: 60px;
  `};
`;

const SectionRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  margin-right: auto;
  margin-bottom: 30px;
  width: 50%;
  border-bottom: 1px dashed #aaa;

  ${media.lessThan('small')`
      margin: auto;
      margin-bottom: 60px;
      width: 80%;
      text-align: center;
      font-size: 25px;
  `};
`;

const SectionDiscription = styled.div`
  margin: 20px auto;
  text-align: center;
`;

const Img = styled.img.attrs(props => ({
  src: Path.home + props.src,
}))`
  width: 600px;
  ${media.lessThan('small')`
    width: 100%;
  `};
`;

export default HowToUse;
