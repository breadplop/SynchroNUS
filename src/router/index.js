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
import ExchangeUniversitiesFive from '@/components/pages/5-ExchangeUniversities'
import ExchangeModulesSix from '@/components/pages/6-ExchangeModules'
import RandomChart from '@/components/pages/7-RandomChart'


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
      path: '/exchange-universities',
      name: 'Exchange Universities',
      component: ExchangeUniversitiesFive
    },
    {
      path: '/exchange-modules',
      name: 'Exchange Modules',
      component: ExchangeModulesSix
    },
    {
      path: '/random-chart',
      name: 'Random Chart',
      component: RandomChart
    }                                  
  ]
})
