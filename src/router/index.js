import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ByeWorld from '@/components/ByeWorld'
import Template from '@/components/Template'
import TemplateGraphs from '@/components/TemplateGraphs'
import Playground from '@/components/Playground'
import ModulePlanningOne from '@/components/pages/1-ModulePlanning'
import TeachingReviewTwo from '@/components/pages/2-TeachingReview'
import CareerProspectsThree from '@/components/pages/3-CareerProspects'
import JobSearchFour from '@/components/pages/4-JobSearch'
import ExchangePageFive from '@/components/pages/5-ExchangePage'
import ExchangeUniversitiesSix from '@/components/pages/6-ExchangeUniversities'
import ExchangeModulesSeven from '@/components/pages/7-ExchangeModules'
import ModuleInformationEight from '@/components/pages/8-ModuleInformation'
import ModuleInformationNine from '@/components/pages/9-ModuleInformationBasic'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/bye',
      name: 'ByeWorld',
      component: ByeWorld
    },
    {
      path: '/template',
      name: 'Template',
      component: Template
    },
    {
      path: '/template-graphs',
      name: 'TemplateGraphs',
      component: TemplateGraphs
    },
    {
      path: '/playground',
      name: 'Playground',
      component: Playground
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
    },
    {
      path: '/module-information-basic',
      name: 'Module Information',
      component: ModuleInformationNine,
      props: true
    }
  ]
})
