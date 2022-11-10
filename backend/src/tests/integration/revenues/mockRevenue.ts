import Revenue from "../../../database/models/Revenue";

const mockRevenue: Revenue = new Revenue({
    id: 1,
    name: "Salário",
    value: "3500",
    date: "2022-11-5",
    category: "Fixo",
    userId: 1
});

export default mockRevenue;