import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading, bookings } = useRecentBookings();
  const {
    isLoading: isgettingStays,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();

  const { cabins, isLoading: isgettingCabins } = useCabins();

  if (isLoading || isgettingStays || isgettingCabins) return <Spinner />;
  // console.log(confirmedStays, "dash");
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity  />
      <DurationChart confirmedStays={confirmedStays} />

      <SalesChart numDays={numDays} bookings={bookings} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
