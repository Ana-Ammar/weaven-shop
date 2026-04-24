import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase.config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    imageUrl: ''
  });

  const [submitting, setSubmitting] = useState(false);

  // const fetchBanners = async () => {
  //   setLoading(true);
  //   try {
  //     const querySnapshot = await getDocs(collection(db, 'banners'));
  //     const bannersData = querySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }));
  //     setBanners(bannersData);
  //   } catch (error) {
  //     console.error("Error fetching banners: ", error);
  //     alert("Failed to fetch banners.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchBanners();
  // }, []);

  const handleOpenModal = (banner = null) => {
    if (banner) {
      setEditingId(banner.id);
      setFormData({
        title: banner.title,
        subtitle: banner.subtitle,
        buttonText: banner.buttonText,
        buttonLink: banner.buttonLink,
        imageUrl: banner.imageUrl
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        subtitle: '',
        buttonText: 'Shop Now',
        buttonLink: '/products',
        imageUrl: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'banners', editingId), formData);
      } else {
        await addDoc(collection(db, 'banners'), formData);
      }
      await fetchBanners();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving banner:", error);
      alert("Failed to save banner.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await deleteDoc(doc(db, 'banners', id));
        await fetchBanners();
      } catch (error) {
        console.error("Error deleting banner:", error);
        alert("Failed to delete banner.");
      }
    }
  };

  // if (loading) {
  //   return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-rich-accent"></span></div>;
  // }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-rich-text">Manage Banners</h1>
        <button
          onClick={() => handleOpenModal()}
          className="btn bg-rich-accent text-white border-none shadow-none hover:bg-rich-accent-hover"
        >
          <Plus className="w-5 h-5" /> Add New Banner
        </button>
      </div>

      <div className="bg-rich-card rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-rich-base text-rich-text">
              <tr>
                <th>Image</th>
                <th>Header</th>
                <th>Subtitle</th>
                <th>Button</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-rich-text-muted">
                    No banners found. Add one to get started!
                  </td>
                </tr>
              ) : (
                banners.map((banner) => (
                  <tr key={banner.id} className="border-b border-rich-card-hover hover:bg-rich-base/50">
                    <td>
                      <div className="avatar">
                        <div className="w-24 h-16 rounded shadow">
                          <img src={banner.imageUrl} alt={banner.title} className="object-cover" />
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold text-rich-text">{banner.title}</td>
                    <td className="max-w-xs truncate text-rich-text-muted" title={banner.subtitle}>{banner.subtitle}</td>
                    <td>
                      <div className="text-sm text-rich-text font-medium">{banner.buttonText}</div>
                      <div className="text-xs text-rich-text-muted">{banner.buttonLink}</div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal(banner)}
                          className="btn btn-sm btn-ghost text-info"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(banner.id)}
                          className="btn btn-sm btn-ghost text-error"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-rich-card max-w-2xl">
            <h3 className="font-bold text-2xl mb-6 text-rich-text">
              {editingId ? 'Edit Banner' : 'Add New Banner'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control w-full">
                <label className="label"><span className="label-text text-rich-text font-medium">Header Title</span></label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Elevate Your Style"
                  className="input input-bordered w-full bg-rich-base text-rich-text border-rich-card-hover"
                />
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text text-rich-text font-medium">Mini Paragraph (Subtitle)</span></label>
                <textarea
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Discover the latest trends..."
                  className="textarea textarea-bordered h-24 bg-rich-base text-rich-text border-rich-card-hover"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label"><span className="label-text text-rich-text font-medium">Button Text</span></label>
                  <input
                    type="text"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Shop Now"
                    className="input input-bordered w-full bg-rich-base text-rich-text border-rich-card-hover"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label"><span className="label-text text-rich-text font-medium">Button Link</span></label>
                  <input
                    type="text"
                    name="buttonLink"
                    value={formData.buttonLink}
                    onChange={handleChange}
                    required
                    placeholder="e.g. /products"
                    className="input input-bordered w-full bg-rich-base text-rich-text border-rich-card-hover"
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text text-rich-text font-medium">Image URL (Right Side Photo)</span></label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full bg-rich-base text-rich-text border-rich-card-hover"
                />
              </div>

              <div className="modal-action mt-6">
                <button type="button" onClick={handleCloseModal} className="btn bg-rich-base text-rich-text border-none hover:bg-rich-card-hover">Cancel</button>
                <button type="submit" disabled={submitting} className={`btn bg-rich-accent text-white border-none shadow-none hover:bg-rich-accent-hover ${submitting ? 'loading' : ''}`}>
                  {editingId ? 'Save Changes' : 'Add Banner'}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={handleCloseModal}>
            <button>close</button>
          </div>
        </div>
      )}
    </div>
  );
}
