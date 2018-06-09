export default {
    isFetchingCompanies: ( state ) => ({ isFetching: state.getIn([ 'companies', 'status', 'isFetching' ]) }),
    companies: ( state ) => ({
        allIds: state.getIn([ 'companies', 'allIds' ]),
        byId: state.getIn([ 'companies', 'byId' ]),
    })
};
