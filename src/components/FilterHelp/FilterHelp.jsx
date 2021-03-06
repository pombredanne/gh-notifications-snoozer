const React = require('react')

class FilterHelp extends React.Component {
  render() {
    return (
      <div className="filter-help-container">
        <h2 className="subtitle">Search Query Help</h2>
        <div className="content">
          <p>
            Put <code>-</code> in front of a filter to exclude matching issues
            and pull requests, e.g., <code>-org:some_organization</code>.
          </p>
        </div>
        <ul className="search-query-help">
          <li>
            <code>type</code> &mdash; With this qualifier you can restrict the
            search to issues (<code>issue</code>) or pull request
            (<code>pr</code>) only.
          </li>
          <li>
            <code>in</code> &mdash; Qualifies which fields are searched. With
            this qualifier you can restrict the search to just the title
            (<code>title</code>), body (<code>body</code>), comments
            (<code>comments</code>), or any combination of these.
          </li>
          <li>
            <code>author</code> &mdash; Finds issues or pull requests created
            by a certain user.
          </li>
          <li>
            <code>assignee</code> &mdash; Finds issues or pull requests that
            are assigned to a certain user.
          </li>
          <li>
            <code>mentions</code> &mdash; Finds issues or pull requests that
            mention a certain user.
          </li>
          <li>
            <code>commenter</code> &mdash; Finds issues or pull requests that
            a certain user commented on.
          </li>
          <li>
            <code>involves</code> &mdash; Finds issues or pull requests that
            were either created by a certain user, assigned to that user,
            mention that user, or were commented on by that user.
          </li>
          <li>
            <code>team</code> &mdash; For organizations you're a member of,
            finds issues or pull requests that @mention a team within the
            organization.
          </li>
          <li>
            <code>state</code> &mdash; Filter issues or pull requests based on
            whether they're open or closed.
          </li>
          <li>
            <code>label</code> &mdash; Filters issues or pull requests based
            on their labels.
          </li>
          <li>
            <code>no</code> &mdash; Filters items missing certain metadata,
            such as <code>label</code>, <code>milestone</code>, or
            <code> assignee</code>.
          </li>
          <li>
            <code>language</code> &mdash; Searches for issues or pull requests
            within repositories that match a certain language.
          </li>
          <li>
            <code>is</code> &mdash; Searches for items within repositories that
            match a certain state, such as <code>open</code>,
            <code> closed</code>, or <code>merged</code>
          </li>
          <li>
            <code>created</code> or <code>updated</code> &mdash; Filters issues
            or pull requests based on date of creation, or when they were last
            updated.
          </li>
          <li>
            <code>merged</code> &mdash; Filters pull requests based on the date
            when they were merged.
          </li>
          <li>
            <code>status</code> &mdash; Filters pull requests based on the
            commit status.
          </li>
          <li>
            <code>head</code> or <code>base</code> &mdash; Filters pull
            requests based on the branch that they came from or that they are
            modifying.
          </li>
          <li>
            <code>closed</code> &mdash; Filters issues or pull requests based
            on the date when they were closed.
          </li>
          <li>
            <code>comments</code> &mdash; Filters issues or pull requests based
            on the quantity of comments.
          </li>
          <li>
            <code>user</code>, <code>org</code>, or <code>repo</code> &mdash;
            Limits searches to a specific user, organization, or repository.
          </li>
          <li>
            <code>sort</code> &mdash; Choose how to order the results. Valid
            fields include <code>comments</code>, <code>created</code>,
            <code> updated</code>, <code>reactions</code>,
            <code> reactions-+1</code>, <code>reactions--1</code>,
            <code> reactions-smile</code>, <code>reactions-thinking_face</code>,
            <code> reactions-heart</code>, <code>reactions-tada</code>, and
            <code> interactions</code>. Append <code>-desc</code> to sort
            descending. Defaults to sorting newest first.
          </li>
          <li>
            <code>milestone</code> &mdash; Filter by milestone name, e.g.,
            <code> milestone:"Brilliant Features"</code>.
          </li>
          <li>
            <code>reactions</code> &mdash; Filter by reaction count, e.g.,
            <code> reactions:&gt;42</code>.
          </li>
          <li>
            <code>interactions</code> &mdash; Filter by reaction + comment
            count, e.g., <code>interactions:&lt;10</code>.
          </li>
        </ul>
      </div>
    )
  }
}

module.exports = FilterHelp
