import BarGraph from "@utils/themes/components/BarGraph"
import PieChart from "@utils/themes/components/PieChart"

const AdminDashboard = () => {

    return (
        <div className="h-full flex  ml-10 items-center" >
            <BarGraph />
            <PieChart />
        </div>
    )
}

export default AdminDashboard