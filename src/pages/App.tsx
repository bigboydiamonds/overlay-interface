import './App.css';
import React, { useEffect } from 'react';
import { useCallback, useMemo } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Web3ReactManager from '../components/Web3ReactManager/Web3ReactManager';
import Header from '../components/Header/Header';
import CurrentBlock from '../components/CurrentBlock/CurrentBlock';
import Markets from './Markets/Markets';
import { Market } from './Markets/Market/Market';
import { Position } from './Positions/Position';
import Positions from './Positions/Positions';
import Liquidate from './Liquidate/Liquidate';
import styled from 'styled-components/macro';
import Magic from './Magic/Magic';
import { 
  useAllTransactions, 
  isTransactionRecent
} from '../state/transactions/hooks'
import { TransactionDetails } from '../state/transactions/reducer';

export const AppWrapper = styled.div`
  background-color: ${({theme}) => theme.bg1};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`
// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

const App = () => {

  const allTransactions = useAllTransactions();

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])


  useEffect(() => {
    console.log('allTransactions: ', allTransactions);
  }, [allTransactions])

  return (
    <AppWrapper>
      <Header />
      <Web3ReactManager>
        <Switch>
          <Route exact strict path="/" render={() => <Redirect to="/markets" />} />
          <Route exact strict path="/markets" component={Markets} />
          <Route exact strict path="/markets/:marketId" component={Market} />
          <Route exact strict path="/positions" component={Positions} />
          <Route exact strict path="/positions/:positionId" component={Position} /> 
          <Route exact strict path="/magic" component={Magic} />
          <Route exact strict path="/liquidate" component={Liquidate} />
        </Switch>
      </Web3ReactManager>
      <CurrentBlock />
    </AppWrapper>
  )
}
export default App;
