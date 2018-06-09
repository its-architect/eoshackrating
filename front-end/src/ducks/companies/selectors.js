export default {
    isFetchingCompanies: ( state ) => ({ isFetching: state.getIn([ 'companies', 'status', 'isFetching' ]) }),
};
