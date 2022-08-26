import './home.scss'
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import BarChart from "../../components/BarChart";
import Loader from "../../components/Loader/Loader";
import TableInfo from "../../components/TableInfo/TableInfo";
import IPlanet from "../../models/IPlanet";
import { ATTRIBUTE_TITLE_MAPPING, PLANET_ATTRIBUTES, STAR_WARS_URL } from '../../constants/constants';
import Dropdown from '../../components/Dropdown/Dropdown';
import IPaginatedResult from '../../models/IPaginatedResult';

export default function Home() {
    const [page, setPage] = useState(1);
    const [selectedAttribute, setSelectedAttribute] = useState<keyof IPlanet>('population')
    const [filteredData, setFilteredData] = useState<Array<IPlanet> | null>(null)

    const { data, isLoading, isError, error, isFetching, isPreviousData } = useQuery<IPaginatedResult>(['planets', page], () => fetchData(page), { keepPreviousData: true })

    const fetchData = async (page: number) => {
        const result = await fetch(`${STAR_WARS_URL}/?page=${page}`)
        return result.json();
    }

    const filterPlanetProperties: (planet: any) => IPlanet = (planet) => {
        return {
            name: planet.name,
            population: planet.population,
            rotation_period: planet.rotation_period,
            orbital_period: planet.orbital_period,
            diameter: planet.diameter,
            climate: planet.climate,
            surface_water: planet.surface_water
        }
    }

    useEffect(() => {
        if (data == null) return;
        setFilteredData((data.results
            .sort((planetA, planetB) => planetA.name.toUpperCase() > planetB.name.toUpperCase() ? 1 : -1)
            .map(planet => filterPlanetProperties(planet))))
    }, [data])

    function display(): JSX.Element {
        if (isError) {
            return <div>ERROR: {JSON.stringify(error)}</div>
        }
        if (filteredData != null) {
            return <>
                <div className={'home-bar-chart'}>
                    <BarChart planets={filteredData} attribute={selectedAttribute} />
                    <div className={'home-attribute-dropdown'}>
                        <Dropdown items={PLANET_ATTRIBUTES} value={selectedAttribute} onChange={(event) => setSelectedAttribute(event.target.value as keyof IPlanet)} />
                    </div>
                </div>

                <h2>Planet Information</h2>
                <TableInfo data={filteredData} nameMapping={ATTRIBUTE_TITLE_MAPPING} />
                {displayPaginationControls()}
            </>
        }
        return <></>
    }

    function displayPaginationControls(): JSX.Element {
        if (data == null) return <></>;
        return (
            <div className='home-pagination-controls-container'>
                <div className='home-pagination-controls'>
                    <button onClick={() => handlePageChange(-1)} disabled={data.previous == null || page <= 0}>PREV</button>
                    <div className={'home-page-number'}>{`${page}/${data.count / data.results.length}`}</div>
                    <button onClick={() => handlePageChange(1)} disabled={data.next == null}>NEXT</button>
                </div>
            </div>
        )
    }

    function handlePageChange(delta: number): void {
        if (!isPreviousData && ((data!.next != null && delta > 0) || (data!.previous != null && delta < 0))) {
            setPage((prev) => prev + delta);
        }
    }

    return (
        <div className={'home'}>
            {display()}
            <div className={'home-loader'}>
                {isFetching || isLoading ? <Loader /> : null}
            </div>
        </div>
    )
}