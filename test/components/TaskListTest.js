const assert = require('assert')
const React = require('react')
const ReactDOM = require('react-dom')
const ReactRedux = require('react-redux')
const Redux = require('redux')
const TestUtils = require('react-addons-test-utils')
const fetchMock = require('fetch-mock')

const ElectronConfig = require('electron-config')
const storage = new ElectronConfig({ name: 'config-test' })

const Config = require('../../src/config.json')
const App = require('../../src/components/App')
const reducer = require('../../src/reducers/reducer')
const GitHubAuth = require('../../src/models/GitHubAuth')
const Filter = require('../../src/models/Filter')
const LastFilter = require('../../src/models/LastFilter')
const fixtures = require('../fixtures')

describe('TaskList', () => {
  let renderedDOM
  let store

  before(() => {
    storage.clear()

    // Persist access token
    GitHubAuth.setToken('test-whee')

    // Fake responses from GitHub API
    fetchMock.get(`${Config.githubApiUrl}/user`, { login: 'testuser123' })
    fetchMock.get(`${Config.githubApiUrl}/search/issues?q=cats`,
                  { items: [fixtures.pullRequest, fixtures.issue] })

    // Persist a filter
    const filter = new Filter('Cool name')
    filter.store('cats')
    LastFilter.save('Cool name')

    // Setup Redux store and render app
    store = Redux.createStore(reducer, { tasks: [] })
    const component = TestUtils.renderIntoDocument(
      <ReactRedux.Provider store={store}>
        <App />
      </ReactRedux.Provider>
    )
    renderedDOM = () => ReactDOM.findDOMNode(component)
  })

  after(() => {
    fetchMock.restore()
  })

  it('shows task that is not snoozed, archived, or ignored', () => {
    const taskListItems = renderedDOM().querySelectorAll('#pull-163031382')
    assert.equal(1, taskListItems.length)
  })

  it('does not show task that is ignored')

  it('does not show task that is archived', () => {
    store.dispatch({ type: 'TASKS_SELECT', task: {
      storageKey: 'pull-163031382',
    } })
    store.dispatch({ type: 'TASKS_ARCHIVE' })

    const taskListItems = renderedDOM().querySelectorAll('#pull-163031382')
    assert.equal(0, taskListItems.length)
  })

  it('does not show task that is snoozed', () => {
    store.dispatch({ type: 'TASKS_SELECT', task: {
      storageKey: 'pull-163031382',
    } })
    store.dispatch({ type: 'TASKS_SNOOZE' })

    const taskListItems = renderedDOM().querySelectorAll('#pull-163031382')
    assert.equal(0, taskListItems.length)
  })

  context('when the snooze button is clicked', () => {
    let snoozeTime

    before(() => {
      store.dispatch({ type: 'TASKS_SELECT', task: {
        storageKey: 'pull-163031382',
      } })

      TestUtils.Simulate.click(renderedDOM().querySelector('#snooze-button'))
      snoozeTime = new Date()
    })

    after(() => {
      const task = store.getState().tasks[0]
      const updatedTask = Object.assign({}, task, { snoozedAt: null })
      store.dispatch({ type: 'TASKS_UPDATE', tasks: [updatedTask] })

      store.dispatch({ type: 'TASKS_DESELECT', task: {
        storageKey: 'pull-163031382',
      } })
    })

    it('hides selected tasks', () => {
      const taskListItems = renderedDOM().querySelectorAll('#pull-163031382')
      assert.equal(0, taskListItems.length)
    })

    it("updates the selected task's `snoozedAt` field", () => {
      const task = store.getState().tasks[0]
      assert.equal('string', typeof task.snoozedAt)
    })

    it('shows the tasks again after 24 hours', () => {
      const tasks = store.getState().tasks
      const pastSnooze = new Date()
      pastSnooze.setDate(snoozeTime.getDate() - 1)
      const updatedTask = Object.assign({}, tasks[1], {
        snoozedAt: pastSnooze.toISOString(),
      })
      store.dispatch({ type: 'TASKS_UPDATE', tasks: [tasks[0], updatedTask] })

      const taskListItems = renderedDOM().querySelectorAll('#issue-148539337')
      assert.equal(1, taskListItems.length)
    })
  })

  context('when the archive button is clicked', () => {
    let archiveTime

    before(() => {
      store.dispatch({ type: 'TASKS_SELECT', task: {
        storageKey: 'pull-163031382',
      } })

      TestUtils.Simulate.click(renderedDOM().querySelector('#archive-button'))
      archiveTime = new Date()
    })

    after(() => {
      const tasks = store.getState().tasks
      const updatedTask = Object.assign({}, tasks[0], { archivedAt: null })
      store.dispatch({ type: 'TASKS_UPDATE', tasks: [updatedTask, tasks[1]] })

      store.dispatch({ type: 'TASKS_DESELECT', task: {
        storageKey: 'pull-163031382',
      } })
    })

    it('hides selected tasks', () => {
      const taskListItems = renderedDOM().querySelectorAll('#pull-163031382')
      assert.equal(0, taskListItems.length)
    })

    it("updates the selected task's `archivedAt` field", () => {
      const task = store.getState().tasks[0]
      assert.equal('string', typeof task.archivedAt)
    })

    it('shows tasks again if `updatedAt` is greater than `archivedAt`', () => {
      const tasks = store.getState().tasks
      const updatedTask = Object.assign({}, tasks[1], {
        updatedAt: new Date(archiveTime.getFullYear() + 1, 0, 1).toISOString(),
      })
      store.dispatch({ type: 'TASKS_UPDATE', tasks: [tasks[0], updatedTask] })

      const taskListItems = renderedDOM().querySelectorAll('#issue-148539337')
      assert.equal(1, taskListItems.length)
    })
  })

  context('when the ignore button is clicked', () => {
    it('hides selected tasks')
    it("updates the selected task's `ignored` field")
  })
})
