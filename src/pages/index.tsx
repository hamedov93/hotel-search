import { useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
  useAppDispatch,
  useAppSelector,
} from '@app/redux/hooks';
import { selectHotel } from '@app/features/hotel/hotelSlice';
import { selectSearch, setSearch } from '@app/features/hotel/searchSlice';
import { getHotels } from '@app/features/hotel/hotelThunk';
import { getTotalNights, applyFilters } from '@app/utils/common';
import Container from '@app/components/Container';
import Sidebar from '@app/components/Sidebar';
import DateSearch from '@app/components/DateSearch';
import Listing from '@app/components/Listing';
import SortButton from '@app/components/SortButton';
import Loading from '@app/components/Loading';
import styles from '@app/styles/Home.module.scss';
import { request } from '@app/utils/request';
import { getMinAndMaxPrice } from '@app/utils/common';
import { Hotel } from '@app/interfaces/hotel';

// Load hotels using server side rendering
export const getServerSideProps: GetServerSideProps = async (context) => {
  const hotels = await request<Array<Hotel>>('https://run.mocky.io/v3/48244d7b-52e9-4b5f-b122-bd763e53fa5c');

  return {
    props: {
      hotels,
    },
  };
}

interface Props {
  hotels: Array<Hotel>,
}

const Home: NextPage<Props> = ({ hotels }) => {

  const dispatch = useAppDispatch();
  // Fetch hotels from store if we use client side rendering
  let { /*hotels,*/ loading, error } = useAppSelector(selectHotel);
  const search = useAppSelector(selectSearch);
  const { fromDate, toDate } = search;

  useEffect(() => {
    // Dispatch getHotels action if we use client side rendering
    // dispatch(getHotels());
  }, []);

  const totalNights = getTotalNights(fromDate, toDate);
  const [minPrice, maxPrice] = getMinAndMaxPrice(hotels);

  hotels = applyFilters(hotels, search);

  return (
    <>
      <Head>
        <title>Hotel Search App</title>
        <meta name="description" content="Search hotels and more..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Container>
          <DateSearch />
          <div className="wrapper">
            <Sidebar rangeMinPrice={minPrice} rangeMaxPrice={maxPrice} />
            <div className="content">
              <div className={styles.hotelSorting}>
                <div className="total-nights">
                  Total Nights: {totalNights}
                </div>
                <SortButton field="name" label="Sort by Name" />
                <SortButton field="price" label="Sort by Price" />
              </div>
              <div className={styles.grid}>
                {loading ?
                  <Loading /> :
                  hotels.map(hotel => (
                    <Listing {...hotel} nights={totalNights} key={hotel.name} />
                  ))
                }
                {!loading && hotels.length === 0 &&
                  <div>No results found</div>
                }
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

export default Home;
