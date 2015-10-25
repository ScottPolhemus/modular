<?php
$module_post = @get_sub_field('module_post');

if($module_post) {
  global $post;

  $post = $module_post;

  setup_postdata($post);
}
?>
<section class="post">
  <?php
  if($module_post == false || get_sub_field('show_post_header')): ?>
    <header>
      <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
      <p><?php the_time() ?> by <?php the_author(); ?><p>
    </header>
  <?php
  endif;
  ?>
  <main>
    <?php
    if($module_post == false || get_sub_field('show_full_content')) {

      the_content();

    } else {

      the_excerpt();

    }
    ?>
  </main>
</section>
<?php
if($module_post) {
  wp_reset_postdata();
}
?>