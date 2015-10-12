require 'test_helper'

class PageTurnersControllerTest < ActionController::TestCase
  setup do
    @page_turner = page_turners(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:page_turners)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create page_turner" do
    assert_difference('PageTurner.count') do
      post :create, page_turner: {  }
    end

    assert_redirected_to page_turner_path(assigns(:page_turner))
  end

  test "should show page_turner" do
    get :show, id: @page_turner
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @page_turner
    assert_response :success
  end

  test "should update page_turner" do
    patch :update, id: @page_turner, page_turner: {  }
    assert_redirected_to page_turner_path(assigns(:page_turner))
  end

  test "should destroy page_turner" do
    assert_difference('PageTurner.count', -1) do
      delete :destroy, id: @page_turner
    end

    assert_redirected_to page_turners_path
  end
end
