import { observable, action } from 'mobx'
import { message } from 'antd'
import bind from 'utils/bind'
import { IProject } from 'apis/project/model'
import Store from '../../stores/store'
import {
  listProjectCode,
  listProjects,
  deleteProject,
  createProject,
  updateProject,
  listProjectByDate,
} from 'apis/project'

export default class ProjectStore extends Store {
  @observable projects: IProject[] = []
  @observable code: string = ''
  @observable date: string = ''

  @bind
  @action
  setCode(code: string) {
    this.code = code
    this.date = ''
  }

  @bind
  @action
  setDate(date: string) {
    this.date = date
    this.code = ''
  }

  @bind
  @action
  setProjects(projects: IProject[]) {
    this.projects = projects
  }

  @bind
  listProject() {
    if (this.code) {
      listProjectCode(this.code).then(project => {
        this.setProjects(project)
      })
    } else if (this.date) {
      listProjectByDate(this.date).then(project => {
        this.setProjects(project)
      })
    } else {
      listProjects().then(project => {
        this.setProjects(project)
      })
    }
  }

  @bind
  handleDelete(code: string) {
    deleteProject(code).then(
      () => this.listProject(),
      message.success('删除成功'),
    )
  }
  @bind
  createProject(project: IProject) {
    return createProject(project).then(() => this.listProject())
  }
  @bind
  updateProject(project: IProject) {
    return updateProject(project).then(() => this.listProject())
  }
}
