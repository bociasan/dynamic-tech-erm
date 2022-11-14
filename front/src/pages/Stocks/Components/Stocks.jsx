import {Box} from "@mui/material";
import Stock from "./Stock";

export default function Stocks({stocks}){
    return <Box width={"80%"}>
        {
            stocks?.map(stock => <Stock key={stock._id} stock={stock}/>)
        }
    </Box>
}