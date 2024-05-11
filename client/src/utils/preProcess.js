const preFundName = (mfData, fundName, setFundName) => {
    const tp = ["Fund Name"];
    mfData.forEach((element) => {
        tp.push(element.super_category);
    })
    setFundName(tp);
    // console.log(tp);
}

const preFundDetails = (mfData, fundDetails, setFundDetails) => {
    const tp = [[
        "Risk",
        "Min SIP Amount",
        "Expense Ratio",
        "NAV",
        "Fund Size",
        "Exit Load"
    ]];
    mfData.forEach((element) => {
        const jp = [];
        jp.push(element.return_stats[0].risk);
        jp.push("₹ " + element.min_sip_investment);
        jp.push(element.expense_ratio+"%");
        jp.push("₹ "+element.nav + " Cr");
        jp.push("₹ "+element.aum);
        jp.push(element.exit_load);
        tp.push(jp);
    })
    setFundDetails(tp);
}

const preReturns = (mfData, returns, setReturns) => {
    const tp = [[
        "1 Year",
        "3 Year",
        "5 Year"
    ]];
    mfData.forEach((element) => {
        const jp = [];
        jp.push(element.stats[0].stat_1y?element.stats[0].stat_1y+"%":"NA");
        jp.push(element.stats[0].stat_2y?element.stats[0].stat_2y+"%":"NA");
        jp.push(element.stats[0].stat_3y?element.stats[0].stat_3y+"%":"NA");
        tp.push(jp);
    })
    setReturns(tp);
}

const preProsCons = (mfData, prosCons, setProsCons) => {
    // const tp = [[
    //     "Pros",
    //     "Cons"
    // ]];
    const tp = [];
    mfData.forEach((element) => {
        const jp = [[],[]];
        console.log("hckdvlknl");
        let i=1;
        let j=1;
        element.analysis.forEach((ele)=>{
            if(ele.analysis_type === "PROS"){
                jp[0].push((i)+". " +ele.analysis_desc);
                i++;
            }
            else{
                jp[1].push((j)+". " +ele.analysis_desc);
                j++;
            }
        })
        console.log("hckdvlknl");
        if(jp[0].length === 0)
            jp[0].push("No Pros");
        if(jp[1].length === 0)
            jp[1].push("No Cons");
        tp.push(jp);
    })
    console.log(tp);
    setProsCons(tp);
}

// const preHoldings = (mfData, holdings, setHoldings) => {
//     const tp =[[
//         "Top 5",
//         "Top 20",
//         "P/E",
//         "P/B",
//         "Turnover",
//         "Equity",
//         "Cash"
//     ]] ;
//     mfData.forEach((element) => {
//         const jp = [];
//         jp.push(element.top5Holdings);
//         jp.push(element.top20Holdings);
//         jp.push(element.pe);
//         jp.push(element.pb);
//         jp.push(element.turnover);
//         jp.push(element.equity);
//         jp.push(element.cash);
//         tp.push(jp);
//     })
//     setHoldings(tp);
// }

const preHoldings = (mfData, holdings, setHoldings) => {
    // const tp = [[
    //     "Top 10 Holdings"
    // ]]
    const tp = []
    mfData.forEach((element) => {
        const jp = [["Name","Assets"]];
        element.holdings.forEach((ele,idx) => {
            if(idx<10)
                jp.push([ele.company_name,ele.corpus_per+"%"]);
        });
        tp.push(jp);
    })
    // console.log(tp);
    setHoldings(tp);
}

const preFundManager = (mfData, fundManager, setFundManager) => {
    const tp = [[
        "Name",
        "Education",
        "Experience"
    ]]
    mfData.forEach((element) => {
        const jp = [];
        jp.push(element.fund_manager);
        jp.push(element.fund_manager_details[0].education);
        jp.push(element.fund_manager_details[0].experience);
        tp.push(jp);
    })
    setFundManager(tp);
}

const preFund = (mfData, fund, setFund) => {
    const tp = [[
        "Description",
        "Launch Date",
        "Custodian",
        "Registrar & Transfer Agent"
    ]]
    mfData.forEach((element) => {
        const jp = [];
        jp.push(element.amc_info.description);
        jp.push(element.amc_info.launch_date);
        jp.push(element.rta_details.custodian_name);
        jp.push(element.rta_details.rta_name);
        tp.push(jp);
    })
    setFund(tp);
}

export function preProcess(mfData, fundName, setFundName, fundDetails, setFundDetails, returns, setReturns, prosCons, setProsCons, holdings, setHoldings, fundManager, setFundManager, fund, setFund) {
    preFundName(mfData, fundName, setFundName);
    preFundDetails(mfData, fundDetails, setFundDetails);
    preReturns(mfData, returns, setReturns);
    preProsCons(mfData, prosCons, setProsCons);
    preHoldings(mfData, holdings, setHoldings);
    preFundManager(mfData, fundManager, setFundManager);
    preFund(mfData, fund, setFund);
}