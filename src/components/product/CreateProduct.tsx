import { useFormik } from 'formik'
import { useState, memo } from 'react'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'

import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import { createProductsAsync, fetchProductsAsync } from '../../redux/slices/productSlice'
import { AppState, useAppDispatch } from '../../redux/store'
import { CreateProductType } from '../../misc/type'

const CreateProduct = () => {
  const categories = useSelector((state: AppState) => state.categories.categories)
  const categoryId = categories.length > 0 ? categories[1].id : 1
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      price: null,
      description: '',
      categoryId: categoryId,
      images: ['']
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      price: Yup.number().positive('Price must be a positive number').required('Required'),
      description: Yup.string().required('Required'),
      categoryId: Yup.string().required('Required'),
      images: Yup.string().required('Required')
    }),
    onSubmit: async (data: CreateProductType, { resetForm }) => {
      const imagesArray = typeof data.images === 'string' ? [data.images] : data.images
      const modifiedData = { ...data, images: imagesArray }

      try {
        await dispatch(createProductsAsync(modifiedData))
        await dispatch(fetchProductsAsync())
      } catch (error) {
        return error
      }
      resetForm()
    }
  })
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    formik.resetForm()
  }

  return (
    <Box sx={{ margin: '10px 0 0 10px' }}>
      <Button variant="outlined" startIcon={<AddToPhotosIcon />} sx={{ padding: 1 }} onClick={handleOpenModal}>
        Create New Product
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'background.default',
            boxShadow: 24,
            p: 4,
            maxWidth: 400
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: '600' }}>
            New Product
          </Typography>
          <FormControl
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <TextField
              id="title"
              name="title"
              label="Title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Enter the product name"
              variant="outlined"
              margin="normal"
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              sx={{ marginBottom: 1, width: '300px' }}
            />

            <TextField
              id="price"
              name="price"
              label="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              placeholder="Enter the product price"
              variant="outlined"
              margin="normal"
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              sx={{ marginBottom: 1, width: '300px' }}
            />

            <TextField
              id="description"
              name="description"
              label="Description"
              type="text"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Enter the product description"
              variant="outlined"
              margin="normal"
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              sx={{ marginBottom: 1, width: '300px' }}
            />

            <Select
              id="category"
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              variant="outlined"
              error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
              sx={{ marginTop: 2, width: '300px' }}
            >
              {categories.slice(1).map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.categoryId && formik.errors.categoryId && (
              <FormHelperText error>{formik.errors.categoryId}</FormHelperText>
            )}

            <TextField
              id="images"
              name="images"
              label="The Product URL"
              type="text"
              value={[formik.values.images]}
              onChange={formik.handleChange}
              placeholder="Enter your photo url"
              variant="outlined"
              margin="normal"
              error={formik.touched.images && Boolean(formik.errors.images)}
              helperText={formik.touched.images && formik.errors.images}
              sx={{ marginTop: 3, width: '300px' }}
            />

            <Button type="submit" variant="contained" sx={{ width: '300px', marginTop: 2 }}>
              Create
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  )
}

export default memo(CreateProduct)
