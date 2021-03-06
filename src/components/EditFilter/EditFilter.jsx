const React = require('react')
const Filter = require('../../models/Filter')
const FilterHelp = require('../FilterHelp')
const hookUpStickyNav = require('../hookUpStickyNav')

class EditFilter extends React.Component {
  constructor(props) {
    super(props)
    const { filter } = props
    this.state = {
      valueHasError: false,
      key: filter.key,
      value: filter.retrieve(),
    }
  }

  save(event) {
    event.preventDefault()
    if (this.state.value.length < 1) {
      this.setState({ valueHasError: true })
      return
    }
    this.setState({ valueHasError: false })
    let key = this.state.key.trim()
    if (key.length < 1) {
      key = this.state.value
    }
    const filter = new Filter(key)
    filter.store(this.state.value)
    if (this.props.filter.key !== key) {
      this.props.delete(this.props.filter.key)
    }
    this.props.save(key)
  }

  cancel(event) {
    event.preventDefault()
    this.props.cancel()
  }

  valueChanged(event) {
    this.setState({ value: event.target.value })
  }

  keyChanged(event) {
    this.setState({ key: event.target.value })
  }

  render() {
    let valueClass = 'input'
    if (this.state.valueHasError) {
      valueClass += ' is-danger'
    }
    return (
      <div>
        <nav className="nav top-nav" id="edit-filter-top-navigation">
          <div className="nav-left">
            <h1 className="title">
              <a
                href="#"
                onClick={event => this.cancel(event)}
              >Manage Filters</a>
              <span> / </span>
              Edit
            </h1>
          </div>
          <div className="nav-right">
            <button
              onClick={event => this.cancel(event)}
              type="button"
              className="is-link button"
              title="Manage filters"
            ><span className="octicon octicon-beaker"></span></button>
            <button
              onClick={() => this.props.addFilter()}
              type="button"
              className="is-link button"
              title="Add a filter"
            ><span className="octicon octicon-plus"></span></button>
          </div>
        </nav>
        <div className="edit-filter-container">
          <form className="edit-filter-form" onSubmit={event => this.save(event)}>
            <label className="label">Search query:</label>
            <p className="control">
              <input
                type="text"
                name="filterValue"
                className={valueClass}
                value={this.state.value}
                onChange={e => this.valueChanged(e)}
                placeholder="e.g., team:org/team-name is:open"
              />
            </p>
            <label className="label">Filter name: (optional)</label>
            <p className="control">
              <input
                type="text"
                name="filterKey"
                className="input"
                value={this.state.key}
                onChange={e => this.keyChanged(e)}
                placeholder="e.g., Team mentions"
              />
            </p>
            <p className="control">
              <button type="submit" className="button is-primary">
                Save Filter
              </button>
              <button
                type="button"
                onClick={e => this.cancel(e)}
                className="button is-link"
              >Cancel</button>
            </p>
          </form>
          <FilterHelp />
        </div>
      </div>
    )
  }
}

EditFilter.propTypes = {
  filter: React.PropTypes.object.isRequired,
  save: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired,
  addFilter: React.PropTypes.func.isRequired,
  delete: React.PropTypes.func.isRequired,
}

module.exports = hookUpStickyNav(EditFilter, 'edit-filter-top-navigation')
