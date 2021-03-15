import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import {AccountPage} from './pages/AccountPage'
import {AuthPage} from './pages/AuthPage'
import { CreatePage } from './pages/CreatePage'
import { FanficPage } from './pages/FanficPage'
import { AdminPage } from './pages/AdminPage'
import { FanficChapterPage } from './pages/FanficChapterPage'
import { CreateChapterPage } from './pages/CreateChapterPage'
import { SearchPage } from './pages/SearchPage'
import { ChangeChapterPage } from './pages/ChangeChapterPage'
export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return(
            <Switch>
                 <Route path = "/" exact>
                    <HomePage />
                </Route>
                <Route path = "/account">
                    <AccountPage />
                </Route>
                <Route path = "/create">
                    <CreatePage />
                </Route>
                <Route path = "/fanfic/:id">
                    <FanficPage />
                </Route>
                <Route path = "/admin" exact>
                    <AdminPage/>
                </Route>
                <Route path = "/chapter/:id">
                    <FanficChapterPage />
                </Route>
                <Route path = "/chapterAdd/:id">
                    <CreateChapterPage />
                </Route>
                <Route path = "/search/:keyword" >
                    <SearchPage/>
                </Route>
                <Route path = "/chapterChange/:id" >
                    <ChangeChapterPage/>
                </Route>
                
                <Redirect to = "/"/>
                
            </Switch>
        )
    }


    return(
        <Switch>
             <Route path = "/fanfic/:id">
                    <FanficPage />
                </Route>
             <Route path = "/" exact>
                <HomePage />
            </Route>
            <Route path = "/chapter/:id" exact>
                <FanficChapterPage />
            </Route>
            <Route path = "/authenticated" exact>
                <AuthPage />
            </Route>
            <Route path = "/search/:keyword" >
                    <SearchPage/>
                </Route>
            <Redirect to = "/" />
    </Switch>
    )
}