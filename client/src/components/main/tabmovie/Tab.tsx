import React, { useState } from 'react';
import TabSlider from './Tabslider';
import TabCard from './TabCard';
import {
  TabContainer,
  TabMenuContainer,
  TabItem,
  TabContentContainer,
} from '../../styles/tabmovie/Tab.styled';

//dummy
import { ITop, dummyNewMovies } from '../../../dummy/dummyNewMovies';
import { dummyPopular } from '../../../dummy/dummyPopular';
import { dummyUpcomming } from '../../../dummy/dummyUpcoming';

const TabMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState('신작');
  const [data, setData] = useState<ITop[]>(dummyNewMovies);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === '신작') {
      setData(dummyNewMovies);
    } else if (tabName === '인기') {
      setData(dummyPopular);
    } else if (tabName === '개봉예정') {
      setData(dummyUpcomming);
    }
  };

  return (
    <TabContainer>
      <TabMenuContainer>
        <TabItem
          isActive={activeTab === '신작'}
          onClick={() => handleTabClick('신작')}
        >
          신작
        </TabItem>
        <TabItem
          isActive={activeTab === '인기'}
          onClick={() => handleTabClick('인기')}
        >
          인기
        </TabItem>
        <TabItem
          isActive={activeTab === '개봉예정'}
          onClick={() => handleTabClick('개봉예정')}
        >
          개봉예정
        </TabItem>
      </TabMenuContainer>
      <TabContentContainer>
        <TabSlider key={activeTab}>
          {data.map((movie: ITop) => {
            return (
              <TabCard
                key={movie.id}
                poster={movie.poster}
                title={movie.title}
                openat={movie.openat}
                country={movie.country}
              />
            );
          })}
        </TabSlider>
      </TabContentContainer>
    </TabContainer>
  );
};

export default TabMenu;
