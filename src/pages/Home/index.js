import React from "react";
import PropTypes from "prop-types";
import { MainLayout } from "../../layouts";
import { authApi, boardApi } from "../../apis";
import { map } from "lodash";

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
      <div>{boards.length && map(boards, (item) => <p>{item.name}</p>)}</div>
    </MainLayout>
  );
};

HomePage.propTypes = {};

export default HomePage;
