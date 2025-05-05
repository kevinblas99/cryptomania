import React, {useState} from 'react';
import { Typography, Row, Col, Card, Select } from 'antd';
import moment from 'moment';
import Loader from './Loader';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title } = Typography;
const { Option } = Select;
const demoImage = "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
    const [ keyword, SetKeyword] = useState('cryptocurrencies')
    const { data: cryptoNews } = useGetCryptoNewsQuery({ keyword , count: simplified ? 6 : 12 });
    const { data } = useGetCryptosQuery(100);
    console.log(cryptoNews);

    if (!cryptoNews) return <Loader />;

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-name'
                        placeholder='Select a Crypto'
                        optionFilterProp='children'
                        onChange={(value) => SetKeyword(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}
            {cryptoNews.data?.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.link} target="_blank" rel="noreferrer">
                            <div className='news-image-container'>
                                <Title className='news-title' level={4}>{news.title}</Title>
                                <img style={{maxWidth:"100px", maxHeight:"100px"}}src={news.photo_url || demoImage} alt='news' />
                            </div>
                            <p>
                                {news.snippet 
                                  ? (news.snippet.length > 100 
                                      ? `${news.snippet.substring(0, 100)} ... `
                                      : news.snippet)
                                  : "No description available."}
                            </p>
                            <div className="news-source">
                                <span>{news.source_name}</span> - <span>{moment(news.published_datetime_utc).fromNow()}</span>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default News;
