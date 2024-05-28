import CategoryManagement from '../../../components/category'
import Layout from '../../../layout'

const Category = () => {
  return (
    <Layout>
      <div className="bg-[white] rounded-lg p-5 min-screen-height">
        <CategoryManagement/>
      </div>

    </Layout>
  )
}

export default Category