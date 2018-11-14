import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ModulePlanningOne from '@/components/pages/1-ModulePlanning'
import TeachingReviewTwo from '@/components/pages/2-TeachingReview'
import CareerProspectsThree from '@/components/pages/3-CareerProspects'
import JobSearchFour from '@/components/pages/4-JobSearch'
import ExchangePageFive from '@/components/pages/5-ExchangePage'
import ExchangeUniversitiesSix from '@/components/pages/6-ExchangeUniversities'
import ExchangeModulesSeven from '@/components/pages/7-ExchangeModules'
import ModuleInformationEight from '@/components/pages/8-ModuleInformation'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SynchroNUS',
      component: HelloWorld,
      props: true
    },
    {
      path: '/module-review',
      name: 'Module Review',
      component: ModulePlanningOne
    },
    {
      path: '/teaching-review',
      name: 'Teaching Review',
      component: TeachingReviewTwo
    },
    {
      path: '/career-prospects',
      name: 'Career Prospects',
      component: CareerProspectsThree
    },
    {
      path: '/job-search',
      name: 'Job Search',
      component: JobSearchFour
    },
    {
      path: '/exchange-page',
      name: 'Exchange',
      component: ExchangePageFive,
      props: true
    },
    {
      path: '/exchange-universities',
      name: 'Exchange Universities',
      component: ExchangeUniversitiesSix,
      props: true
    },
    {
      path: '/exchange-modules',
      name: 'Exchange Modules',
      component: ExchangeModulesSeven,
      props: true
    },
    {
      path: '/module-information',
      name: 'Module Information',
      component: ModuleInformationEight,
      props: true
    }
  ]
})
