<?php
$bg_image = get_sub_field('background_image');
$bg_style = $bg_image ? 'background-image: url('.$bg_image.');' : '';

$content = get_sub_field('content');
?>

<section class="hero" style="<?php echo $bg_style; ?>">
  <?php
  if($content) {
    echo apply_filters('the_content', $content);
  }
  ?>
</section>