import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Container } from '@material-ui/core';

import { MainLayout } from "../../layouts";
import { authApi, boardApi } from "../../apis";
import { isEmpty, map } from "lodash";
import CustomCard from "./components/Card";
import './styles.scss';

const _renderBoard = (data) => {
  if (data.length) {
    const formatData = (data) => {
      if (!isEmpty(data)) {
        return {
          name: data.name,
          createdBy: data.createdBy.username
        }
      } else return null
    }
    return (
      <div className="board">
        {map(data, (item, idx) => <div key={idx} className='item'><CustomCard data={formatData(item)} /></div>)}
      </div>
    )
  } else return null
}

const HomePage = (props) => {
  const [boards, setBoards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const _fetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, message } = await boardApi.getAll();
      console.log(data);
      setBoards(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  React.useEffect(() => {
    _fetch();
  }, []);
  return (
    <MainLayout>
      <div className="HomePage">
        <Container maxWidth="lg">{_renderBoard(boards)}</Container>
      </div>
    </MainLayout>
  );
};

HomePage.propTypes = {};

export default HomePage;
