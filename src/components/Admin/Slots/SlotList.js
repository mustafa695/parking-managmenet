
import React from 'react'
import SideMenu from '../SideMenu'

const SlotList = () => {
    return (
        <>
        <SideMenu />
        <div className="container" id="side_content">
          <div className="card">
            <h2 className="mb-4" style={{ fontWeight: "500" }}>
              Slot List
            </h2>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead
                  style={{
                    backgroundColor: "#000",
                    border: "1px solid #000",
                    color: "#fff",
                  }}
                >
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    )
}

export default SlotList
