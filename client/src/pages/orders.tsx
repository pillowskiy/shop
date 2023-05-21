import {Meta} from "@containers/Meta";
import AuthProvider from "@providers/AuthProvider";
import {Header} from "@containers/header/Header";
import {SideBar} from "@containers/aside/SideBar";
import {Main} from "@containers/Main";
import {Orders} from "@containers/cards/orders/Orders";
import {useProfile} from "@hooks/useProfile";
import {useQuery} from "@tanstack/react-query";
import OrderService from "@api/services/order.service";
import {EmptyItems} from "@containers/EmptyItems";
import {OrdersTable} from "@containers/OrdersTable";

export default function Page() {
    const {profile} = useProfile();
    const {data: orders} = useQuery(['get orders', profile?.id], () => {
        return OrderService.getOrders();
    }, {
        select: ({data}) => data
    })

    return (
        <Meta title={"Orders"}>
            <AuthProvider forAuth={true}>
                <Header />
                <SideBar />
                <Main className="flex relative items-center justify-center min-h-screen-64">
                    {
                        !orders?.length ?
                            <EmptyItems>There are not orders yet.</EmptyItems>:
                            <OrdersTable orders={orders} />
                    }
                </Main>
            </AuthProvider>
        </Meta>
    );
};